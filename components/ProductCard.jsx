import Link from "next/link";
import Image from "next/image";
function ProductCard({ title, id, price, pictureUrl }) {
  return (
    <div className="border w-80   rounded-md shadow-sm hover:shadow-lg">
      <Link href={`/products/${id}`}>
        <a>
          <Image
            width={320}
            height={240}
            objectFit="cover"
            src={pictureUrl}
            alt=""
          />

          <div className="p-2 flex justify-between items-baseline">
            <h2 className="text-lg font-bold">{title}</h2>
            <span>{price}</span>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default ProductCard;
