function Label({ children, label, ...props }) {
  return (
    <label
      {...props}
      className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
    >
      <span>{label}</span>
      {children}
    </label>
  );
}

export default Label;
