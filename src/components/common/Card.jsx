const Card = ({ children, className = '', hover = false, ...props }) => {
  return (
    <div
      className={`bg-card-bg border border-border rounded-lg p-6 transition-all duration-200 ${
        hover ? 'hover:shadow-md hover:-translate-y-1 cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
