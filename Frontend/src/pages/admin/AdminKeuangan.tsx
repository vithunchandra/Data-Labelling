import { AxiosError } from "axios";
import { client } from "../../api/client";
import useAuth from "../../customHooks/authenticate";
import { useLoaderData } from "react-router-dom";

export default function AdminKeuangan() {
  const tasks = useLoaderData();
  const requester = [];
  const worker = [];
  let data = [];

  tasks.map((task) => {
    let tempPriceRequester = 0;
    let tempPriceWorker = 0;
    task.data.map((data) => {
      tempPriceRequester += data.labels.length * data.price;
      tempPriceWorker = data.price;
      data.labels.map((label) => {
        const tempDataWorker = {
          name: label.worker.name,
          role: "Worker",
          money: tempPriceWorker,
        };
        const existingIndex = worker.findIndex(
          (e) => e.name === label.worker.name
        );
        if (existingIndex !== -1) {
          worker[existingIndex].money += tempPriceWorker;
        } else {
          worker.push(tempDataWorker);
        }
      });
    });

    const tempDataRequester = {
      name: task.requester.name,
      role: "Requester",
      money: tempPriceRequester,
    };
    const existingIndex = requester.findIndex(
      (e) => e.name === task.requester.name
    );

    if (existingIndex !== -1) {
      requester[existingIndex].money += tempPriceRequester;
    } else {
      requester.push(tempDataRequester);
    }
  });
  data = [...worker, ...requester];

  return (
    <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
      <div className="fw-bold fs-4 mb-2">User Financial</div>
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Role</th>
            <th>Money</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.role}</td>
              {item.role == "Worker" && <td className="text-success">$ {item.money}</td>}
              {item.role == "Requester" && <td className="text-danger">$ {item.money}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function test({ params }: any) {
  const { getToken } = useAuth();

  try {
    const response = await client.get("admin/test", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      return console.log(err.response?.data.message);
    }
    return console.log(err);
  }
}
