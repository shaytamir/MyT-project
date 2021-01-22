import Swal from "sweetalert2";

/* swall confirm delete message */
export async function swalConfitm() {
  const deleteAlert = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      return true;
    } else {
      return false;
    }
  });
  if (deleteAlert) return true;
  return false;
}

/* high light searched text */
export const getHighlightedText = (text, highlight) => {
  // Split on highlight term and include term into parts, ignore case
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {" "}
      {parts.map((part, i) => (
        <span
          key={i}
          // className="highlight"
          style={
            part.toLowerCase() === highlight.toLowerCase()
              ? { backgroundColor: "orange" }
              : {}
          }
        >
          {part}
        </span>
      ))}{" "}
    </span>
  );
};
