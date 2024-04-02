displayData();

// Item data into Dropdown

let listData = JSON.parse(localStorage.getItem("lsData"));
let rlist = "";
// let cd = listData.Item.length;
if (listData != null && listData.Item.length > 0) {
  for (let i = 0; i < listData.Item.length; i++) {
    rlist +=
      "<option value=' " +
      listData.Item[i].id +
      " '>" +
      listData.Item[i].itemName +
      "</option>";
  }
  document.getElementById("Proid").innerHTML = rlist;
}

// On change event

document.getElementById("proImg").addEventListener("change", function () {
  let pimg10 = document.getElementById("proImg");

  if (pimg10.files && pimg10.files[0]) {
    let im2 = new FileReader();
    im2.readAsDataURL(pimg10.files[0]);
    im2.addEventListener("load", () => {
      localStorage.setItem("proImg", JSON.stringify(im2.result));
      document.iform.proimgupdate.value = im2.result;
    });
  }
});

// For insert data

document.getElementById("saveData").addEventListener("click", () => {
  let pcatid = document.iform.Proid.value;
  let pname = document.iform.proName.value;
  let pprice = document.iform.proPrice.value;
  let pimag = document.iform.proimgupdate.value;
  let hidv = document.iform.hid.value;
  let getd = JSON.parse(localStorage.getItem("prodetail"));

  let proObj = {
    id: 1,
    pid: 1,
    qty: 1,
    name: pname,
    price: pprice,
    catid: pcatid,
    image: JSON.parse(localStorage.getItem("proImg")),
  };

  let pobj10 = {};
  pobj10.productDetail = [proObj];

  if (pname != "") {
    if (getd != null) {
      if (hidv != "") {
        for (let i = 0; i < getd.productDetail.length; i++) {
          if (hidv == getd.productDetail[i].id) {
            getd.productDetail[i].name = pname;
            getd.productDetail[i].price = pprice;
            getd.productDetail[i].catid = pcatid;
            if (pimag != "") {
              getd.productDetail[i].image = pimag;
            } else {
              getd.productDetail[i].image = JSON.parse(
                localStorage.getItem("proImg")
              );
            }
          }
        }
        localStorage.setItem("prodetail", JSON.stringify(getd));
        document.getElementById("hid").value = "";
        localStorage.removeItem("proImg");
      } else {
        let line1 = getd.productDetail.length;
        let proObj = {
          id: line1 + 1,
          pid: line1 + 1,
          qty: 1,
          name: pname,
          price: pprice,
          catid: pcatid,
          image: JSON.parse(localStorage.getItem("proImg")),
        };
        getd.productDetail.push(proObj);
        pobj10 = getd;
        localStorage.setItem("prodetail", JSON.stringify(pobj10));
        localStorage.removeItem("proImg");
      }
    } else {
      pobj10.productDetail = [proObj];
      localStorage.setItem("prodetail", JSON.stringify(pobj10));
      localStorage.removeItem("proImg");
    }
    document.iform.reset();
    displayData();
  }
});

// For display data in table

function displayData() {
  let din = "";

  din += "<tr>";
  din += "<th>Id</th>";
  din += "<th>Category Name</th>";
  din += "<th>Product Name</th>";
  din += "<th>Price</th>";
  din += "<th>Image</th>";
  din += "<th colspan = '2'>Action</th>";
  din += "</tr>";

  let infod = JSON.parse(localStorage.getItem("prodetail"));
  if (infod != null && infod.productDetail.length > 0) {
    let k = JSON.parse(localStorage.getItem("lsData"));

    for (let i = 0; i < infod.productDetail.length; i++) {
      din += "<tr>";
      din += "<td>" + infod.productDetail[i].id + "</td>";

      for (let j = 0; j < k.Item.length; j++) {
        if (k.Item[j].id == infod.productDetail[i].catid) {
          din += `<td>${k.Item[j].itemName}</td>`;
        }
      }

      din += "<td>" + infod.productDetail[i].name + "</td>";
      din += "<td>" + infod.productDetail[i].price + "</td>";
      din +=
        "<td> <img src =' " +
        infod.productDetail[i].image +
        " ' height='150px' width='150px'</td>";
      din +=
        "<td><input type='button' name='editbtn' value='Edit' onclick='editData(" +
        infod.productDetail[i].id +
        ")'>";
      din +=
        " <input type='button' name='delbtn' id='delbtn' value='Delete' onclick='delData(" +
        infod.productDetail[i].id +
        ")'></td>";
      din += "</tr>";
    }
  }
  document.getElementById("itable").innerHTML = din;
}

// For delete data

function delData(id) {
  let infod = JSON.parse(localStorage.getItem("prodetail"));
  if (infod != null && infod.productDetail.length > 0) {
    let k1 = id - 1;
    infod.productDetail.splice(k1, 1);
    let j = 1;
    for (let i = 0; i < infod.productDetail.length; i++) {
      infod.productDetail[i].id = j;
      infod.productDetail[i].pid = j;
      j++;
    }
    localStorage.setItem("prodetail", JSON.stringify(infod));
    displayData();
  }
  displayData();
}

// For Update Data

function editData(id) {
  let infod = JSON.parse(localStorage.getItem("prodetail"));
  for (let i = 0; i < infod.productDetail.length; i++) {
    if (id == infod.productDetail[i].id) {
      document.iform.proName.value = infod.productDetail[i].name;
      document.iform.proPrice.value = infod.productDetail[i].price;
      document.iform.Proid.value = infod.productDetail[i].catid;
      document.iform.proimgupdate.value = infod.productDetail[i].image;
      document.iform.hid.value = infod.productDetail[i].id;
    }
  }
}
