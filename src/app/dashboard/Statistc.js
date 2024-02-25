import { HoverEffect } from "@/components/ui/card-hover-effect";

function Statistc() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Events Created",
    description:
      "eventCount",
    link: "#",
  },
  {
    title: "Forms Generated",
    description:
      "FormCount",
    link: "#",
  },
  {
    title: "Current Event",
    description:
      "currenteventCount",
    link: "#",
  },
];

{/* <div className="flex space-x-6 pt-10">
            <div className="flex-1 shadow-lg bg-gray-50  p-6 rounded-md">
                <h2 className="text-lg font-semibold m-5 cursor-pointer hover:text-slate-600">Events Created</h2>
                <p className="text-3xl font-bold m-5 cursor-pointer">eventCount</p>
            </div>


            <div className="flex-1 shadow-lg bg-gray-50 p-6 rounded-md">
                <h2 className="text-lg font-semibold m-5 cursor-pointer">Forms Generated</h2>
                <p className="text-3xl font-bold m-5 cursor-pointer">FormCount</p>
            </div>


            <div className="flex-1 shadow-lg bg-gray-50 p-6 rounded-md">
                <h2 className="text-lg font-semibold m-5 cursor-pointer">Current Event</h2>
                <p className="text-3xl font-bold m-5 cursor-pointer">currenteventCount</p>
            </div>
        </div> */}

export default Statistc