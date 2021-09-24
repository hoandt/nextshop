function Title({ children, tailwind = "" }) {
  return <h1 className={`text-2xl py-2 ${tailwind}`}>{children}</h1>;
}

export default Title;
