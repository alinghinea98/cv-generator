import { useEffect, useState } from 'react';
import { Statistic } from 'antd';

interface AnimatedStatisticProps {
  title: string;
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Animated Statistic Component
 * Counts up from 0 to the target value when it comes into view
 */
export default function AnimatedStatistic({
  title,
  value,
  suffix = '',
  duration = 2000,
  className = '',
}: AnimatedStatisticProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const animateValue = () => {
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (value - startValue) * easeOutQuart);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isVisible) return; // Don't set up observer if already visible
    
    // Intersection Observer to trigger animation when element is visible
    const className = `stat-item-${title.replace(/\s+/g, '-').toLowerCase()}`;
    let observer: IntersectionObserver | null = null;
    
    // Use setTimeout to ensure DOM is ready
    const timer = setTimeout(() => {
      const element = document.querySelector(`.${className}`);
      
      if (!element || isVisible) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isVisible) {
              setIsVisible(true);
              animateValue();
            }
          });
        },
        { threshold: 0.3 } // Trigger when 30% visible
      );

      observer.observe(element);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [title, isVisible]);

  return (
    <div className={`stat-item stat-item-${title.replace(/\s+/g, '-').toLowerCase()} ${className}`}>
      <Statistic
        title={title}
        value={count}
        suffix={suffix}
      />
    </div>
  );
}

