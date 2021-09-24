import useUser from "hooks/user";
import Link from "next/link";
import { useSignOut } from "hooks/user";
function Navbar() {
  const [isLoading, error, user] = useUser();
  const { signOut } = useSignOut();
  const handleSignOut = async () => {
    const valid = await signOut();
  };

  return (
    <ul className="flex p-2 items-baseline">
      <li>
        <Link href="/">
          <a className="font-extrabold text-2xl mr-2">Next Shop</a>
        </Link>
      </li>

      <li role="separator" className="flex-1"></li>

      {user ? (
        <>
          <li className="mr-2">
            <Link href="/cart">
              <a>Cart</a>
            </Link>
          </li>
          <li>
            <p className="italic">
              Hi, {user.username}!
              <button
                className="border text-sm px-2 ml-2 rounded"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </p>
          </li>
        </>
      ) : (
        <li>
          <Link href="/signin">
            <button>Sign In</button>
          </Link>
        </li>
      )}
    </ul>
  );
}

export default Navbar;
