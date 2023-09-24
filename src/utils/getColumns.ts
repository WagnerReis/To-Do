const colors = ["#B10E5C", "#0047FF", "#0AB061", "#E9B824"];

export function getColumns() {
  return [
    {
      id: 0,
      title: "To Do",
      color: colors[0],
      status: "new",
    },
    {
      id: 1,
      title: "Doing",
      color: colors[1],
      status: "doing",
    },
    {
      id: 2,
      title: "Validating",
      color: colors[2],
      status: "validation",
    },
    {
      id: 3,
      title: "Done",
      color: colors[3],
      status: "done",
    },
  ];
}
