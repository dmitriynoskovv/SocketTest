import React from 'react';

export const LazyComponent: React.FC<{
  children: JSX.Element;
  threshold?: number;
  rootMargin?: string;
  onVisible?: () => void;
}> = ({ children, threshold, rootMargin, onVisible }) => {
  const ref = React.useMemo(() => React.createRef<HTMLDivElement>(), []);

  const [isVisible, setIsVisible] = React.useState(false);

  React.useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const options = {
      rootMargin: rootMargin ?? '0px',
      threshold: threshold ?? 1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();

          if (onVisible) {
            onVisible();
          }
        }
      });
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, ref, onVisible]);

  return <div ref={ref}>{isVisible ? children : null}</div>;
};
