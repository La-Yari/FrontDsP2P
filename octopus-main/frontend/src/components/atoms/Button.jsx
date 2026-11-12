export function Button({ variant = 'neutral', size = 'md', className = '', type = 'button', ...props }) {
  return <button type={type} className={`btn btn--${variant} btn--${size} ${className}`} {...props} />;
}
