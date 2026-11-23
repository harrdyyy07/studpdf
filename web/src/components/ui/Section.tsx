import React from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ children, className = '', style, ...props }) => {
  const hasPaddingY = /\bpy-/.test(className);
  const defaultPadding = hasPaddingY ? '' : 'py-10 md:py-16';

  return (
    <section
      className={`mp-section w-full ${defaultPadding} ${className}`.trim()}
      style={{ boxSizing: 'border-box', ...style }}
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;
