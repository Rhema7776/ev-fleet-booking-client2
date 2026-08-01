import { Card, CardContent } from "../ui/card";

function SectionCard({ title, children }) {
  return (
    <Card className="rounded-2xl border-0 shadow-sm">

      <CardContent className="p-6">

        <h2 className="text-xl font-semibold mb-6">

          {title}

        </h2>

        {children}

      </CardContent>

    </Card>
  );
}

export default SectionCard;