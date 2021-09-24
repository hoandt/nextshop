function Button({ children, type, ...props }) {
  return (
    <button
      {...props}
      type={type}
      className="w-full mt-2 px-3 py-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none duration-100 ease-in-out"
    >
      {children}
    </button>
  );
}

export default Button;
