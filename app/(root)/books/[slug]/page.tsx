import { getBookBySlug } from "@/lib/actions/book.actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import VapiControls from "@/components/VapiControls";


const BookDetailsPage = async ({params}: {params: Promise<{slug: string}>}) => {

    const { slug } = await params;
    const result = await getBookBySlug(slug)
    const book = result.data
    console.log(book)
  return (
    <div className="book-page-container" >
        <Link href="/" className="back-btn-floating">
        <ArrowLeft className="size-6 text-[#212a3b]" />
      </Link>
      <VapiControls book={book} />
    </div>
  )
}

export default BookDetailsPage