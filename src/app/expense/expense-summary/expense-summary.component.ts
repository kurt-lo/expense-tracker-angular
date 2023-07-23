import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartDataset, ChartTypeRegistry, LinearScale, RadialLinearScale,  registerables } from 'chart.js';
import { ExpenseService } from '../expense.service';

// Register LinearScale and RadialLinearScale
Chart.register(LinearScale, RadialLinearScale);

// Register other chart types and plugins
Chart.register(...registerables);

interface ExtendedChartDataset extends ChartDataset<'bar', number[]> {}

@Component({
  selector: 'app-expense-summary',
  templateUrl: './expense-summary.component.html',
  styleUrls: ['./expense-summary.component.scss']
})
export class ExpenseSummaryComponent implements OnInit, AfterViewInit {
  @ViewChild('categoryChart') categoryChartRef!: ElementRef;
  @ViewChild('dailyChart') dailyChartRef!: ElementRef;
  @ViewChild('weeklyChart') weeklyChartRef!: ElementRef;

  categoryChart!: Chart;
  dailyChart!: Chart;
  weeklyChart!: Chart;
   totalExpensesSummary: number = 0;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.expenseService.getAll().subscribe(expenses => {
     // First chart - Total amount per category
    const categoryTotals = expenses.reduce((acc: { [x: string]: any; }, curr: { category: string | number; price: any; }) => {
      if (acc[curr.category]) {
        acc[curr.category] += curr.price;
      } else {
        acc[curr.category] = curr.price;
      }
      return acc;
    }, {});

    const categoryLabels = Object.keys(categoryTotals);
    const categoryDatasets: ExtendedChartDataset[] = [{
      label: 'Summary',
      data: Object.values(categoryTotals),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }];

    const categoryConfig: ChartConfiguration<'bar', number[], string> = {
      type: 'bar',
      data: {
        labels: categoryLabels,
        datasets: categoryDatasets
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    const categoryChartCanvas = this.categoryChartRef.nativeElement.getContext('2d');
    this.categoryChart = new Chart(categoryChartCanvas, categoryConfig);


    // Calculate total expenses
    this.totalExpensesSummary = expenses.reduce((acc: number, expense: { price: number }) => {
      return acc + expense.price;
    }, 0);



      // Second chart - Daily expenses per category
      const dailyExpensesByCategory: { [category: string]: { [date: string]: number } } = {};

      // Filter expenses to only include expenses that fall within the current month
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const expensesThisMonth = expenses.filter((expense: { createdAt: string | number | Date; }) => new Date(expense.createdAt).getMonth() === currentMonth);

      expensesThisMonth.forEach((expense: { createdAt: string | number | Date; price: number; category: string }) => {
        const date = new Date(expense.createdAt).toLocaleDateString();
        const category = expense.category;
        const price = expense.price;

        if (!dailyExpensesByCategory[category]) {
          dailyExpensesByCategory[category] = {};
        }
        if (!dailyExpensesByCategory[category][date]) {
          dailyExpensesByCategory[category][date] = 0;
        }
        dailyExpensesByCategory[category][date] += price;
      });

      const dailyLabels = Object.keys(dailyExpensesByCategory[Object.keys(dailyExpensesByCategory)[0]]);

      const dailyDatasets: ExtendedChartDataset[] = Object.keys(dailyExpensesByCategory).map((category: string, index: number) => {
        const backgroundColor = [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ][index % 6];
        const borderColor = `rgba(${index * 50}, ${index * 100}, ${index * 150}, 1)`;
        return {
          label: category,
          data: Object.values(dailyExpensesByCategory[category]),
          backgroundColor,
          borderColor,
          borderWidth: 1
        };
      });

      const dailyConfig: ChartConfiguration<'bar', number[], string> = {
        type: 'bar',
        data: {
          labels: dailyLabels,
          datasets: dailyDatasets
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      };
      console.log(dailyDatasets)
      const dailyChartCanvas = this.dailyChartRef.nativeElement.getContext('2d');
      this.dailyChart = new Chart(dailyChartCanvas, dailyConfig);



      //third chart - weekly expenses
      function getWeekNumber(date: Date) {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const dayOffset = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
        const days = daysInMonth - (7 - dayOffset);
        const weeks = Math.ceil(days / 7);
        const week = Math.floor((date.getDate() + dayOffset - 1) / 7) + 1;
        return { week, weeks };
      }

      const thisMonth = new Date().getMonth();

      const weeklyExpenses: { week: string; expenses: { [category: string]: number } }[] = [];
      expenses.forEach((expense: { createdAt: string | number | Date; category: string; price: any; }) => {
        const date = new Date(expense.createdAt);
        const month = date.getMonth();
        if (month === thisMonth) {
          const { week, weeks } = getWeekNumber(date);
          const monthString = date.toLocaleString('default', { month: 'short' });
          const weekString = `Week ${week}-${weeks} of ${monthString}`;
          const index = weeklyExpenses.findIndex(weeklyExpense => weeklyExpense.week === weekString);
          if (index === -1) {
            weeklyExpenses.push({ week: weekString, expenses: { [expense.category]: expense.price } });
          } else {
            if (expense.category in weeklyExpenses[index].expenses) {
              weeklyExpenses[index].expenses[expense.category] += expense.price;
            } else {
              weeklyExpenses[index].expenses[expense.category] = expense.price;
            }
          }
        }
      });

      const weeklyLabels = weeklyExpenses.map(expense => expense.week);

      const categoryData: { [category: string]: number[] } = {};
      expenses.forEach((expense: { category: string; price: any; }) => {
        if (expense.category in categoryData) {
          categoryData[expense.category].push(expense.price);
        } else {
          categoryData[expense.category] = [expense.price];
        }
      });

      const backgroundColor = [  'rgba(255, 99, 132, 0.2)',  'rgba(54, 162, 235, 0.2)',  'rgba(255, 206, 86, 0.2)',  'rgba(75, 192, 192, 0.2)',  'rgba(153, 102, 255, 0.2)',  'rgba(255, 159, 64, 0.2)'];

      let colorIndex = 0;
      const categoryColors: { [category: string]: string } = {};

      expenses.forEach((expense: { category: string; price: any; }) => {
        if (!(expense.category in categoryColors)) {
          categoryColors[expense.category] = backgroundColor[colorIndex % backgroundColor.length];
          colorIndex++;
        }
      });

      const weeklyDatasets: ExtendedChartDataset[] = Object.entries(categoryData).map(([category, data], index) => ({
        label: category,
        data: weeklyExpenses.map(weekExpense => weekExpense.expenses[category] ?? 0),
        backgroundColor: categoryColors[category],
        borderColor: categoryColors[category],
        borderWidth: 1
      }));


      const weeklyConfig: ChartConfiguration<'bar', number[], string> = {
        type: 'bar',
        data: {
          labels: weeklyLabels,
          datasets: weeklyDatasets
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      };
            
      const weeklyChartCanvas = this.weeklyChartRef.nativeElement.getContext('2d');
      this.weeklyChart = new Chart(weeklyChartCanvas, weeklyConfig);
            


    }
  )}
}

