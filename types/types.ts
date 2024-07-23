export interface User {
    id: string;            // UUIDs are typically represented as strings
    email: string;         // Email addresses are strings
    username: string;      // Usernames are strings
    password: string;      // Passwords are strings (Note: usually, you don't expose or use plain passwords in your code)
    createdAt: Date;       // Created timestamps are usually represented as Date objects in JavaScript
  }
  