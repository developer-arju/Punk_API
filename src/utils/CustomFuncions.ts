import data from "../../donneesTest.json";

type Member = {
  id: number;
  name: string;
  linkId: number | null;
};

type Payee = {
  id: number;
  name: string;
};

export const findBillers = (): Payee[] => {
  const membersToPay: Payee[] = [];

  for (let i: number = 0; i < data.length; i++) {
    if (data[i].linkId === null || data[i].linkId === data[i].id) {
      const isExist = membersToPay.filter(
        (member: Payee) => member.id === data[i].id
      );
      if (isExist.length < 1) {
        membersToPay.push({ id: data[i].id, name: data[i].name });
      }
      continue;
    }
    var parentId: number | null = data[i].linkId;
    var currChild: number = data[i].id;
    var visitedChild: Set<number> = new Set();

    const payer = findPayer(visitedChild, currChild, parentId);
    const isExist = membersToPay.filter((member: Payee) => member.id === payer);

    if (isExist.length < 1) {
      const payee = data.filter((member: Member) => member.id === payer);
      membersToPay.push({ id: payee[0].id, name: payee[0].name });
    }
  }

  return membersToPay;
};

export const findDepententChild = (): any => {
  const dChild: any = {};

  data.forEach((member: Member) => {
    data.forEach((data: Member) => {
      if (data.linkId === member.id) {
        if (dChild.hasOwnProperty(member.id)) {
          dChild[member.id] = [
            ...dChild[member.id],
            { id: data.id, name: data.name },
          ];
        } else {
          dChild[member.id] = [{ id: data.id, name: data.name }];
        }
      }
    });
  });

  return dChild;
};

function findPayer(
  visited: Set<number>,
  currChild: number,
  parentId: number | null
): number | null {
  if (!parentId) return parentId;
  if (visited.has(parentId)) {
    return parentId;
  }
  visited.add(currChild);

  let parent: Member | undefined = undefined;

  for (var j: number = 0; j < data.length; j++) {
    if (data[j].id === parentId) {
      parent = data[j];
    }
  }

  if (parent !== undefined) {
    if (parent.linkId === null) {
      return parent.id;
    }
    return findPayer(visited, parent.id, parent.linkId);
  }
  return parentId;
}
