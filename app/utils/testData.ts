import type { Transaction } from "@/app/types/TransactionTypes";

const transactionsTestData: Transaction[] = [
  {
    id: 1,
    dateAdded: "2024-07-01",
    dateIncurred: "2024-06-30",
    name: "Grocery Store",
    location: "New York, NY",
    amount: 45.67,
    addedBy: "Alice",
  },
  {
    id: 2,
    dateAdded: "2024-07-02",
    dateIncurred: "2024-06-29",
    name: "Gas Station",
    location: "Los Angeles, CA",
    amount: 30.25,
    addedBy: "Bob",
  },
  {
    id: 3,
    dateAdded: "2024-07-03",
    dateIncurred: "2024-06-28",
    name: "Electric Bill",
    location: "Chicago, IL",
    amount: 120.0,
    addedBy: "Charlie",
  },
  {
    id: 4,
    dateAdded: "2024-07-04",
    dateIncurred: "2024-06-27",
    name: "Internet Bill",
    location: "Houston, TX",
    amount: 60.0,
    addedBy: "Diana",
  },
  {
    id: 5,
    dateAdded: "2024-07-05",
    dateIncurred: "2024-06-26",
    name: "Dining Out",
    location: "Miami, FL",
    amount: 75.5,
    addedBy: "Eve",
  },
  {
    id: 6,
    dateAdded: "2024-07-06",
    dateIncurred: "2024-06-25",
    name: "Gym Membership",
    location: "San Francisco, CA",
    amount: 40.0,
    addedBy: "Frank",
  },
  {
    id: 7,
    dateAdded: "2024-07-07",
    dateIncurred: "2024-06-24",
    name: "Car Payment",
    location: "Seattle, WA",
    amount: 250.0,
    addedBy: "Grace",
  },
  {
    id: 8,
    dateAdded: "2024-07-08",
    dateIncurred: "2024-06-23",
    name: "Rent",
    location: "Boston, MA",
    amount: 1200.0,
    addedBy: "Hank",
  },
  {
    id: 9,
    dateAdded: "2024-07-09",
    dateIncurred: "2024-06-22",
    name: "Coffee Shop",
    location: "Austin, TX",
    amount: 15.75,
    addedBy: "Ivy",
  },
  {
    id: 10,
    dateAdded: "2024-07-10",
    dateIncurred: "2024-06-21",
    name: "Movie Tickets",
    location: "Denver, CO",
    amount: 25.0,
    addedBy: "Jack",
  },
];

export { transactionsTestData };
