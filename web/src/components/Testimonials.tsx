import React from 'react';

interface TestimonialItem {
  name: string;
  dept: string;
  text: string;
}

const testimonials: TestimonialItem[] = [
  {
    name: "Priya Sharma",
    dept: "CSE, 5th Sem",
    text: "This site is a lifesaver during exams. All the notes are in one place!"
  },
  {
    name: "Rahul Verma",
    dept: "MECH, 7th Sem",
    text: "The previous year question papers are incredibly helpful. Highly recommended."
  },
  {
    name: "Anjali Singh",
    dept: "ECE, 3rd Sem",
    text: "As a junior, finding quality notes was tough. This website made it easy."
  },
  {
    name: "Vikram Rathod",
    dept: "CIVIL, 8th Sem",
    text: "The SGPA calculator is accurate and the UI is very clean. Great work!"
  },
  {
    name: "Sneha Patil",
    dept: "ISE, 6th Sem",
    text: "I contributed my notes and it felt great to help other students."
  },
  {
    name: "Amit Kumar",
    dept: "CSE, 4th Sem",
    text: "Simple, fast, and has everything I need. Better than searching in multiple groups."
  },
  {
    name: "Deepika Rathod",
    dept: "ECE, 7th Sem",
    text: "The dark mode is a great feature for late-night study sessions. Thank you!"
  }
];

const Testimonials: React.FC = () => {
  // Duplicate the list to create a seamless infinite scroll loop
  const scrollList = [...testimonials, ...testimonials];

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="testimonials-title">What Our Users Say</h2>
        
        <div className="testimonials-container">
          <div className="testimonials-track">
            {scrollList.map((item, index) => (
              <div 
                key={`${item.name}-${index}`} 
                className="testimonial-card-wrapper"
              >
                <div className="testimonial-card">
                  <div className="testimonial-avatar">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <p className="testimonial-name">{item.name}</p>
                  <p className="testimonial-dept">{item.dept}</p>
                  <p className="testimonial-text">&ldquo;{item.text}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
