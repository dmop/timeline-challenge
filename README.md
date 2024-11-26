# Interactive Timeline Component

A React-based interactive timeline component with drag-and-drop capabilities, smart lane allocation, and zoom functionality.

## Project Analysis

### Time Spent ⏱️

This implementation took approximately 6 hours to complete:

- 2 hours for initial research, design planning, and inspiration from existing solutions
- 2 hours for core functionality (drag, zoom, lane assignment)
- 1 hour for component structure and organization
- 1 hour for TypeScript types, clean code implementation, and documentation

### What I Like About the Implementation 👍

1. Architecture & Code Quality

   - Clean, modular architecture with clear separation of concerns
   - Strong TypeScript typing providing excellent developer experience
   - Reusable custom hooks that encapsulate complex logic
   - Well-documented code with clear naming conventions

2. User Experience & Features
   - Intuitive drag-and-drop interface
   - Smooth zooming
   - Smart lane allocation
   - Responsive design that works across different screen sizes

### What I Would Change 🔄

1. Technical Improvements

   - Implement proper state management (Redux/Zustand) for better state handling
   - Create a more robust testing suite with Vitest and React Testing Library

2. Feature Additions

   - Multiple timeline views (day, week, month, quarter)
   - Custom event styling and categorization
   - Keyboard shortcuts for better accessibility

3. Performance Optimizations
   - Virtual scrolling for large datasets

### Design Decisions 🎨

1. Research & Inspiration

   - Google Calendar's

2. Architecture Decisions
   - Chose React with TypeScript for robust type safety
   - Implemented custom hooks for better code organization
   - Used Tailwind for utility-first styling approach
   - Separated business logic from presentation components

### Testing Strategy 🧪

If I had more time, I would implement the following testing approach:

1. Unit Tests

   - Test all utility functions (date handling, lane assignment)
   - Test custom hooks in isolation
   - Test individual components with various props

2. Integration Tests

   - Test component interactions
   - Test drag and drop functionality
   - Test zoom behavior

3. E2E Tests
   - Full user flow testing
   - Cross-browser compatibility

## Getting Started

### Prerequisites

- Node.js (20.0.0 or higher)
- npm (9.0.0 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/interactive-timeline.git
```

2. Navigate to the project directory:

```bash
cd interactive-timeline
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run start
```

The application will be available at `http://localhost:3000`
