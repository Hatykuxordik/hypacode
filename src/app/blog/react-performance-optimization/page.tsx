import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowLeft, Share2, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "React Performance Optimization: Advanced Techniques for Faster Apps",
  description: "Discover advanced React performance optimization techniques including memoization, code splitting, and virtual scrolling to build lightning-fast web applications. Learn React.memo, useMemo, useCallback, and more.",
  keywords: [
    "react performance optimization",
    "react memo",
    "usememo react",
    "usecallback react",
    "react code splitting",
    "react virtual scrolling",
    "react performance tips",
    "optimize react app"
  ],
  openGraph: {
    title: "React Performance Optimization: Advanced Techniques for Faster Apps",
    description: "Discover advanced React performance optimization techniques including memoization, code splitting, and virtual scrolling to build lightning-fast web applications.",
    url: '/blog/react-performance-optimization',
    images: [
      {
        url: '/images/react-performance.jpg',
        width: 1200,
        height: 630,
        alt: 'React Performance Optimization Guide',
      },
    ],
  },
  twitter: {
    title: "React Performance Optimization: Advanced Techniques for Faster Apps",
    description: "Discover advanced React performance optimization techniques including memoization, code splitting, and virtual scrolling to build lightning-fast web applications.",
    images: ['/images/react-performance.jpg'],
  },
};

export const dynamic = 'force-static';

export default function ReactPerformanceOptimizationPost() {
  const publishedAt = '2024-01-15';
  const readTime = '8 min read';
  const category = 'React';
  const tags = ['React', 'Performance', 'Optimization', 'JavaScript'];

  return (
    <article className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Blog */}
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                {category}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              React Performance Optimization: Advanced Techniques for Faster Apps
            </h1>
            <div className="flex items-center justify-center text-muted-foreground mb-8">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="mr-4">{new Date(publishedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
              <Clock className="w-4 h-4 mr-2" />
              <span>{readTime}</span>
            </div>
            <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden mb-8">
              <Image
                src="/images/react-performance.jpg"
                alt="React Performance Optimization Guide"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              React applications can become slow and unresponsive as they grow in complexity. 
              Understanding and implementing performance optimization techniques is crucial for 
              delivering exceptional user experiences. In this comprehensive guide, we'll explore 
              advanced React performance optimization strategies that will transform your applications 
              from sluggish to lightning-fast.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">Understanding React Performance Bottlenecks</h2>
            <p className="mb-6">
              Before diving into optimization techniques, it's essential to understand what causes 
              performance issues in React applications. The most common culprits include unnecessary 
              re-renders, expensive computations, large bundle sizes, and inefficient state management. 
              React's virtual DOM is designed to be fast, but it's not magic – poor implementation 
              patterns can still lead to performance degradation.
            </p>

            <p className="mb-6">
              Performance optimization in React is about minimizing work and maximizing efficiency. 
              This means preventing unnecessary component re-renders, optimizing expensive calculations, 
              and ensuring that only the components that need to update actually do so. The key is to 
              identify bottlenecks early and apply the right optimization techniques strategically.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">React.memo: Preventing Unnecessary Re-renders</h2>
            <p className="mb-6">
              React.memo is a higher-order component that memoizes the result of a component. It only 
              re-renders when its props change, making it perfect for optimizing functional components 
              that receive the same props frequently. This is particularly useful for components that 
              are expensive to render or are rendered frequently in lists.
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6">
              <pre className="text-sm overflow-x-auto">
                <code>{`const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  // Expensive rendering logic here
  return (
    <div>
      {data.map(item => (
        <ComplexItem key={item.id} item={item} onUpdate={onUpdate} />
      ))}
    </div>
  );
});

// Custom comparison function for complex props
const MyComponent = React.memo(({ user, settings }) => {
  return <UserProfile user={user} settings={settings} />;
}, (prevProps, nextProps) => {
  return prevProps.user.id === nextProps.user.id &&
         prevProps.settings.theme === nextProps.settings.theme;
});`}</code>
              </pre>
            </div>

            <p className="mb-6">
              When using React.memo, be careful with object and function props. Since JavaScript 
              compares objects by reference, passing new objects or functions as props will cause 
              the component to re-render even if the actual values haven't changed. This is where 
              useMemo and useCallback become essential.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">useMemo: Optimizing Expensive Calculations</h2>
            <p className="mb-6">
              The useMemo hook is designed to memoize expensive calculations and prevent them from 
              running on every render. It's particularly useful for complex data transformations, 
              filtering large arrays, or any computation that doesn't need to run unless specific 
              dependencies change.
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6">
              <pre className="text-sm overflow-x-auto">
                <code>{`const DataVisualization = ({ rawData, filters, sortBy }) => {
  const processedData = useMemo(() => {
    return rawData
      .filter(item => filters.includes(item.category))
      .sort((a, b) => {
        if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      })
      .map(item => ({
        ...item,
        formattedValue: formatCurrency(item.value),
        trend: calculateTrend(item.history)
      }));
  }, [rawData, filters, sortBy]);

  return (
    <div>
      {processedData.map(item => (
        <DataCard key={item.id} data={item} />
      ))}
    </div>
  );
};`}</code>
              </pre>
            </div>

            <p className="mb-6">
              Remember that useMemo has its own overhead. Don't use it for simple calculations or 
              values that change frequently. The goal is to cache expensive operations that would 
              otherwise slow down your component's render cycle.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">useCallback: Stabilizing Function References</h2>
            <p className="mb-6">
              useCallback is crucial when passing functions as props to memoized components. It 
              ensures that function references remain stable across re-renders, preventing 
              unnecessary updates in child components that depend on those functions.
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6">
              <pre className="text-sm overflow-x-auto">
                <code>{`const TodoList = ({ todos, onToggle, onDelete }) => {
  const [filter, setFilter] = useState('all');

  const handleToggle = useCallback((id) => {
    onToggle(id);
  }, [onToggle]);

  const handleDelete = useCallback((id) => {
    onDelete(id);
  }, [onDelete]);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'active':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <div>
      <FilterButtons filter={filter} onFilterChange={setFilter} />
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};`}</code>
              </pre>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Code Splitting and Lazy Loading</h2>
            <p className="mb-6">
              Code splitting is one of the most effective ways to improve initial load times. By 
              splitting your application into smaller chunks and loading them on demand, you can 
              significantly reduce the initial bundle size and improve perceived performance.
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6">
              <pre className="text-sm overflow-x-auto">
                <code>{`import { lazy, Suspense } from 'react';

// Lazy load components
const Dashboard = lazy(() => import('./Dashboard'));
const UserProfile = lazy(() => import('./UserProfile'));
const Analytics = lazy(() => import('./Analytics'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

// Dynamic imports for conditional loading
const AdminPanel = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [AdvancedSettings, setAdvancedSettings] = useState(null);

  const loadAdvancedSettings = async () => {
    const module = await import('./AdvancedSettings');
    setAdvancedSettings(() => module.default);
  };

  useEffect(() => {
    if (showAdvanced && !AdvancedSettings) {
      loadAdvancedSettings();
    }
  }, [showAdvanced, AdvancedSettings]);

  return (
    <div>
      <BasicSettings />
      <button onClick={() => setShowAdvanced(true)}>
        Show Advanced Settings
      </button>
      {showAdvanced && AdvancedSettings && <AdvancedSettings />}
    </div>
  );
};`}</code>
              </pre>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Virtual Scrolling for Large Lists</h2>
            <p className="mb-6">
              When dealing with large datasets, rendering thousands of DOM elements can severely 
              impact performance. Virtual scrolling solves this by only rendering the items that 
              are currently visible in the viewport, dramatically reducing the number of DOM nodes 
              and improving scroll performance.
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6">
              <pre className="text-sm overflow-x-auto">
                <code>{`import { FixedSizeList as List } from 'react-window';

const VirtualizedList = ({ items }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      <ItemComponent item={items[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={80}
      width="100%"
    >
      {Row}
    </List>
  );
};

// For variable height items
import { VariableSizeList } from 'react-window';

const VariableHeightList = ({ items }) => {
  const getItemSize = (index) => {
    // Calculate height based on item content
    return items[index].type === 'header' ? 120 : 80;
  };

  const Row = ({ index, style }) => (
    <div style={style}>
      <DynamicItemComponent item={items[index]} />
    </div>
  );

  return (
    <VariableSizeList
      height={600}
      itemCount={items.length}
      itemSize={getItemSize}
      width="100%"
    >
      {Row}
    </VariableSizeList>
  );
};`}</code>
              </pre>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">State Management Optimization</h2>
            <p className="mb-6">
              Inefficient state management is often the root cause of performance issues. Keeping 
              state as local as possible, avoiding unnecessary state updates, and using proper state 
              structure can significantly improve performance.
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6">
              <pre className="text-sm overflow-x-auto">
                <code>{`// Bad: Global state for local UI concerns
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  
  return (
    <div>
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <MainContent />
      {isModalOpen && <Modal data={modalData} />}
    </div>
  );
};

// Good: Local state management
const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        Open Modal
      </button>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

// Optimized state updates with useReducer
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
        lastUpdated: Date.now()
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    default:
      return state;
  }
};`}</code>
              </pre>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Performance Monitoring and Profiling</h2>
            <p className="mb-6">
              Understanding your application's performance characteristics is crucial for effective 
              optimization. React DevTools Profiler provides insights into component render times, 
              while browser performance tools help identify bottlenecks.
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6">
              <pre className="text-sm overflow-x-auto">
                <code>{`// Performance measurement with React DevTools
import { Profiler } from 'react';

const onRenderCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
  console.log('Component:', id);
  console.log('Phase:', phase);
  console.log('Actual duration:', actualDuration);
  console.log('Base duration:', baseDuration);
};

const App = () => {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Header />
      <MainContent />
      <Footer />
    </Profiler>
  );
};

// Custom performance monitoring
const usePerformanceMonitor = (componentName) => {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      console.log(\`\${componentName} render time: \${endTime - startTime}ms\`);
    };
  });
};

const ExpensiveComponent = () => {
  usePerformanceMonitor('ExpensiveComponent');
  
  // Component logic here
  return <div>...</div>;
};`}</code>
              </pre>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Best Practices and Common Pitfalls</h2>
            <p className="mb-6">
              Effective React performance optimization requires understanding not just the techniques, 
              but also when and how to apply them. Over-optimization can sometimes hurt performance 
              more than help it. Here are key principles to follow:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Measure before optimizing – use profiling tools to identify actual bottlenecks</li>
              <li>Start with the biggest impact optimizations first</li>
              <li>Don't memoize everything – it has overhead and memory costs</li>
              <li>Keep state as local as possible to minimize re-render scope</li>
              <li>Use proper keys in lists to help React identify changes efficiently</li>
              <li>Avoid creating objects and functions in render methods</li>
              <li>Consider using production builds for accurate performance testing</li>
            </ul>

            <p className="mb-6">
              Remember that premature optimization is often counterproductive. Focus on writing 
              clean, maintainable code first, then optimize based on actual performance metrics 
              and user feedback. The techniques covered in this guide will help you build React 
              applications that are not only fast but also scalable and maintainable.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">Conclusion</h2>
            <p className="mb-8">
              React performance optimization is an ongoing process that requires understanding your 
              application's specific needs and constraints. By applying these advanced techniques 
              strategically – from memoization and code splitting to virtual scrolling and proper 
              state management – you can build React applications that deliver exceptional user 
              experiences regardless of scale or complexity.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                <Tag className="w-3 h-3 mr-1 inline" />
                {tag}
              </span>
            ))}
          </div>

          {/* Share */}
          <div className="border-t pt-8 mb-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Share this article</h3>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Related Articles */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Related Articles</h3>
              <div className="space-y-4">
                <Link href="/blog/nextjs-seo-guide" className="block hover:text-primary transition-colors">
                  <h4 className="font-semibold">Complete Next.js SEO Guide: From Basics to Advanced Strategies</h4>
                  <p className="text-sm text-muted-foreground">Master Next.js SEO with metadata API, structured data, and performance optimization.</p>
                </Link>
                <Link href="/blog/typescript-best-practices" className="block hover:text-primary transition-colors">
                  <h4 className="font-semibold">TypeScript Best Practices for React Developers in 2024</h4>
                  <p className="text-sm text-muted-foreground">Essential TypeScript patterns and best practices for React development.</p>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </article>
  );
}

