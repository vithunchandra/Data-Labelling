import { Chip, Avatar } from "@mui/material";
import Label from "../../interface/LabelInterface";

export default function ListLabel({ label }: { label: Label[] }) {
  return (
    <table className="table mt-3">
      <thead>
        <tr>
          <th
            className="align-middle"
            style={{
              width: "20%",
            }}
          >
            Worker
          </th>
          <th
            className="align-middle"
            style={{
              width: "65%",
            }}
          >
            Label
          </th>
        </tr>
      </thead>
      <tbody>
        {label.map((item, index) => {
          return (
            <tr key={index}>
              <td className="align-middle">
                <div className="d-flex align-items-center text-dark">
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  <label className="ms-2">{item.worker.name}</label>
                </div>
              </td>
              <td className="align-middle">{item.answer}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
