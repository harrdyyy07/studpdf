import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'amp-auto-ads': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          type?: string;
          'data-ad-client'?: string;
        },
        HTMLElement
      >;
    }
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'amp-auto-ads': React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLElement> & {
            type?: string;
            'data-ad-client'?: string;
          },
          HTMLElement
        >;
      }
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'amp-auto-ads': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          type?: string;
          'data-ad-client'?: string;
        },
        HTMLElement
      >;
    }
  }
}
