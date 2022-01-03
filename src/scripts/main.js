import bootcampList from "./bootcamps.js";

let bootcamps = bootcampList.sort((a, b) => (a.Bootcamp > b.Bootcamp ? 1 : -1));

/* Creating table */

let table = document.querySelector("#table");
$(document).ready(function () {
  $("#table").DataTable({
    pageLength: bootcamps.length,
    language: {
      search: "Buscar: ",
      info: "Mostrando página _PAGE_ de _PAGES_",
      lengthMenu: "Mostrando _MENU_ resultados",
      infoFiltered: "(filtrado de _MAX_ resultados)",
      paginate: {
        first: "Primero",
        previous: "Anterior",
        next: "Siguiente",
        last: "Último",
      },
    },
  });
});

let head = document.createElement("thead");
let headRow = document.createElement("tr");
head.appendChild(headRow);
table.appendChild(head);

/* Populating table */

let skippedColumns = ["URL", "Estado", "En línea"]; // For future use

Object.keys(bootcamps[0]).forEach((k) => {
  if (skippedColumns.includes(k)) {
    return;
  } else {
    let th = document.createElement("th");
    th.innerText = k;
    headRow.appendChild(th);
  }
});

let body = document.createElement("tbody");
table.appendChild(body);

bootcamps.forEach((bc) => {
  let tr = document.createElement("tr");
  Object.keys(bc).forEach((k) => {
    let td = document.createElement("td");

    if (skippedColumns.includes(k)) {
      return;
    } else {
      let item = document.createElement("span");
      item.innerText = bc[k];
      switch (k) {
        case "Bootcamp":
          let link = document.createElement("a");
          link.href = bc["URL"];
          link.innerText = bc[k];
          item = link;
          break;
        case "Costo":
          td.className = "costo";
          break;
        case "Beca":
          if (bc[k]) td.className = "beca";
          break;
        default:
          break;
      }

      td.appendChild(item);
      tr.appendChild(td);
    }
  });

  body.appendChild(tr);
});
