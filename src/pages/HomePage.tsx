import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getBooks } from "@/http/api";
import { Book } from "@/types";
import { Activity } from "lucide-react";
import { Table, TableCell, TableRow } from "@/components/ui/table";

const HomePage = () => {
  // Todo: add loading and error states
  const { data } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
    staleTime: 10000, // 10 seconds
  });
  return (
    <>
      <h1 className="text-2xl font-semibold">Books</h1>
      {/* //show books here in shadcn table component */}
      <div className="grid grid-cols-3 gap-2">
        {data?.data.map((book: Book) => (
          <Table key={book._id}>
            <TableRow>
              <TableCell>
                <Avatar>
                  <AvatarFallback>
                    <Activity />
                  </AvatarFallback>
                  <AvatarImage src={book.coverImage} alt={book.title} />
                </Avatar>
              </TableCell>
              <TableCell>
                <Card>
                  <CardHeader>
                    <CardTitle>{book.title}</CardTitle>
                    <span className="text-sm font-mono pt-2">
                      Description:{" "}
                    </span>
                    <span>{book.desc.slice(1, 89)}...</span>
                  </CardHeader>
                </Card>
              </TableCell>
            </TableRow>
          </Table>
        ))}
      </div>
    </>
  );
};

export default HomePage;
