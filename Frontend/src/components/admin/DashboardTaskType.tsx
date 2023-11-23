import TaskType from "../../interface/TaskTypeInterface";

export default function DashboardTaskType({
  taskType,
}: {
  taskType: TaskType[];
}) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th className="col-2">No</th>
            <th className="col-8">Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {taskType.map((type, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{type.name}</td>
              <td>{type.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
