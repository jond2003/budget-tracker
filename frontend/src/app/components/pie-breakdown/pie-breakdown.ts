import { Component, computed, input, signal } from '@angular/core';
import { Payment } from '../../models/payment.model';
import { Category } from '../../models/category.model';
import { CategoriesApiService } from '../../services/api/categories/categories-api.service';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

interface CategoryTotal {
  category_id: string;
  amount: number;
}

interface CategorySlice {
  category_id: string;
  name: string;
  colour: string;
  amount: number;
  percentage: number;
  path: string;
}

@Component({
  selector: 'app-pie-breakdown',
  imports: [DecimalPipe, CurrencyPipe],
  templateUrl: './pie-breakdown.html',
  styleUrl: './pie-breakdown.css',
})
export class PieBreakdown {
  payments = input.required<Payment[]>();

  categories = signal<Category[]>([]);
  categoryColours = signal<string[]>([]);

  hoveredCategory = signal<CategorySlice | null>(null);


  slices = computed<CategorySlice[]>(() => {
    const totals = new Map<Category, number>();

    // 1. Group by category_id
    for (const item of this.payments()) {
      totals.set(
        this.categories().find(c => c._id == item.category_id)!,
        (totals.get(this.categories().find(c => c._id == item.category_id)!) ?? 0) + item.amount
      );
    }

    // 2. Calculate total
    const total = Array.from(totals.values())
      .reduce((sum, amount) => sum + amount, 0);

    // 3. Create one pie section per category
    let currentAngle = -90;

    return Array.from(totals.entries()).map(
      ([category, amount]) => {
        const percentage = amount / total;
        const angle = percentage * 360;

        const startAngle = currentAngle;
        const endAngle = currentAngle + angle;

        currentAngle = endAngle;

        console.log(category);

        return {
          category_id: category._id!,
          name: category.name!,
          colour: category.secondary_colour!,
          amount,
          percentage,
          path: this.createArcPath(
            startAngle,
            endAngle
          ),
        };
      }
    );
  });

  // Group and sum by category_id
  categoryTotals = computed<CategoryTotal[]>(() => {
    const totals = new Map<string, number>();

    for (const item of this.payments()) {
      totals.set(
        item.category_id,
        (totals.get(item.category_id) ?? 0) + item.amount
      );
    }

    return Array.from(totals.entries()).map(
      ([category_id, amount]) => ({
        category_id,
        amount,
      })
    );
  });

  total = computed(() =>
    this.categoryTotals().reduce(
      (sum, category) => sum + category.amount,
      0
    )
  );

  private createArcPath(
    startAngle: number,
    endAngle: number
  ): string {
    const cx = 100;
    const cy = 100;
    const radius = 80;

    const start = this.polarToCartesian(
      cx,
      cy,
      radius,
      endAngle
    );

    const end = this.polarToCartesian(
      cx,
      cy,
      radius,
      startAngle
    );

    const largeArcFlag =
      endAngle - startAngle > 180 ? 1 : 0;

    return [
      `M ${cx} ${cy}`,
      `L ${start.x} ${start.y}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
      'Z',
    ].join(' ');
  }

  private polarToCartesian(
    cx: number,
    cy: number,
    radius: number,
    angle: number
  ) {
    const radians = (angle * Math.PI) / 180;

    return {
      x: cx + radius * Math.cos(radians),
      y: cy + radius * Math.sin(radians),
    };
  }

  hoverSlice(category: CategorySlice) {
    this.hoveredCategory.set(category);
  }

  clearHover() {
    this.hoveredCategory.set(null);
  }

  constructor(private categoryApiService: CategoriesApiService) {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryApiService.getCategories().subscribe(cats => {
      this.categories.set(cats);
    });
  }
}
