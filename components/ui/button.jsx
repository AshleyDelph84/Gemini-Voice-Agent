/*
    File: components/ui/button.jsx
    Purpose: Provides a reusable button component with different variants
*/

const Button = ({ 
  children, 
  onClick, 
  variant = 'default',
  className = '',
  ...props 
}) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const variantStyle = variants[variant] || variants.default;

  return (
    <button
      className={`${baseStyles} ${variantStyle} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
