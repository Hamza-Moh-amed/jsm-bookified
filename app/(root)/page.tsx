
import BookCard from "@/components/BookCard";
import HeroSection from "@/components/HeroSection";
import { getAllBooks } from "@/lib/actions/book.actions";
import { sampleBooks } from "@/lib/constants";

const Page = async () =>  {

  const bookResults = await getAllBooks()
  const books = bookResults.success ? bookResults.data ?? [] : []

  console.log(books)

  return (
    <main className="wrapper container">
        <HeroSection />
        <div className="library-books-grid">
            {books.map((book) => (
              <BookCard key={book._id} {...book} />
            ))}
        </div>
      </main>
  );
}

export default Page