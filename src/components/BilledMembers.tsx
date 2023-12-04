import React, { useEffect, useState } from "react";
import { findBillers, findDepententChild } from "../utils/CustomFuncions";

type ElementProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type Payee = {
  id: number;
  name: string;
  depentChildren?: [];
};

const BilledMembers = ({ setIsOpen }: ElementProps) => {
  const [billedMembers, setBilledMembers] = useState<Payee[]>([]);

  useEffect(() => {
    const result: Payee[] = findBillers();
    const childs: any = findDepententChild();
    for (let parentId in childs) {
      for (let i: number = 0; i < result.length; i++) {
        if (result[i].id === parseInt(parentId)) {
          result[i] = { ...result[i], depentChildren: childs[parentId] };
        }
      }
    }
    console.log(result);
    setBilledMembers(result);
  }, []);

  return (
    <div className="inside-modal">
      <div>
        <h2>Billed Club Members</h2>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>dependent children</th>
            </tr>
          </thead>
          <tbody>
            {billedMembers.map((member) => {
              return (
                <tr key={member.id}>
                  <td>{member.id}</td>
                  <td>{member.name}</td>
                  <td>
                    {member?.depentChildren ? (
                      member.depentChildren.map((child: any) => {
                        return (
                          <span>{child.id + " - " + child.name + ","}</span>
                        );
                      })
                    ) : (
                      <span>dependent children not found</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={() => setIsOpen(false)}>close</button>
      </div>
    </div>
  );
};

export default BilledMembers;
