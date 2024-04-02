let tabinfo = JSON.parse(localStorage.getItem("lsData"));
let kk = "";
let dcd = tabinfo.Item.length;

for (let i = 0; i < dcd; i++) {
  kk +=
    "<li class='nav-item'><a class='nav-link' href='#' onclick='dispprodata(" +
    tabinfo.Item[i].id +
    ")'>" +
    tabinfo.Item[i].itemName +
    "</a></li>";
}

document.getElementById("navbar-nav10").innerHTML = kk;

// Add to cart

addtocartdisplay();

function addtocart(id) {
  let data = JSON.parse(localStorage.getItem("prodetail"));
  let addtocartdata = JSON.parse(localStorage.getItem("cartdetail"));
  let addtocartsave = {};
  let addtocartsave2 = {};

  if (addtocartdata != null) {
    let cartd = addtocartdata.find(function (e) {
      return e.pid == id;
    });

    if (cartd != null) {
      for (let j = 0; j < addtocartdata.length; j++) {
        if (addtocartdata[j].pid == id) {
          addtocartdata[j].qty += 1;
          addtocartdata[j].price = parseInt(
            addtocartdata[j].qty * data.productDetail[j].price
          );
        }
      }
      localStorage.setItem("cartdetail", JSON.stringify(addtocartdata));
    } else {
      //push
      for (let i = 0; i < data.productDetail.length; i++) {
        if (id == data.productDetail[i].pid) {
          let len = addtocartdata.length;

          addtocartsave = {
            id: len + 1,
            qty: data.productDetail[i].qty,
            name: data.productDetail[i].name,
            img: data.productDetail[i].image,
            price: data.productDetail[i].price,
            pid: data.productDetail[i].pid,
          };

          document.getElementById("scount").innerHTML = len + 1;

          addtocartdata.push(addtocartsave);
          addtocartsave2 = addtocartdata;
          localStorage.setItem("cartdetail", JSON.stringify(addtocartsave2));
        }
      }
    }
  } else {
    for (let i = 0; i < data.productDetail.length; i++) {
      if (id == data.productDetail[i].id) {
        addtocartsave = {
          id: 1,
          qty: data.productDetail[i].qty,
          name: data.productDetail[i].name,
          img: data.productDetail[i].image,
          price: data.productDetail[i].price,
          pid: data.productDetail[i].pid,
        };
        // document.getElementById("scount").innerHTML = 1;
        localStorage.setItem("cartcount", JSON.stringify(1));
      }
    }

    localStorage.setItem("cartdetail", JSON.stringify([addtocartsave]));
    document.getElementById("cartbadge").style.display = "block";
  }
  addtocartdisplay();
}

function addtocartdisplay() {
  let data = JSON.parse(localStorage.getItem("cartdetail"));
  let row3 = "";
  let sum = 0;
  let quantity = 0;

  if (data != null) {
    row3 += "<tr class='border'>";
    row3 += "<th class='border border-end text-dark'><center>Id</center></th>";
    row3 +=
      "<th class='border border-end text-dark'><center>Name</center></th>";
    row3 +=
      "<th class='border border-end text-dark'><center>Product</center></th>";
    row3 += "<th class='border border-end text-dark'><center>Qty</center></th>";
    row3 +=
      "<th class='border border-end text-dark'><center>Price</center></th>";
    row3 += "<th class='text-dark' colspan='2'><center>Action</center></th>";
    row3 += "</tr>";

    for (let i = 0; i < data.length; i++) {
      row3 += "<tr class='border'>";
      row3 +=
        "<td class='border border-end text-dark'><center>" +
        data[i].id +
        "</center></td>";
      row3 +=
        "<td class='border border-end text-dark'><center>" +
        data[i].name +
        "</center></td>";
      row3 +=
        "<td class='border border-end'><center> <img src='" +
        data[i].img +
        "' height='120px' width='130px'> </center></td>";
      row3 +=
        "<td class='border border-end'><center>" +
        data[i].qty +
        "</center></td>";
      row3 +=
        "<td class='border border-end'><center>" +
        "₹" +
        data[i].price +
        "</center></td>";
      row3 +=
        "<td><center> <input type='button' name='del' id='del' onclick='delcartdata(" +
        data[i].id +
        ")' value='Delete'></center></td>";
      row3 += "</tr>";

      sum += parseInt(data[i].price);

      quantity += parseInt(data[i].qty);
    }
  }

  let l = data.length;

  // document.getElementById("scount").innerHTML = l;
  localStorage.setItem("cartcount", JSON.stringify(l));

  row3 +=
    "<td class='border border-end text-dark' style='font-weight: bold;' colspan='3'><center>Total Amount</center></td>";
  row3 += "<td colspan='2'><center>₹" + sum + "</center></td>";

  document.getElementById("cart-table").innerHTML = row3;
}

// Delete cart data

function delcartdata(id) {
  let data = JSON.parse(localStorage.getItem("cartdetail"));

  if (data != null) {
    for (let i = 0; i < data.length; i++) {
      if (id == data[i].id) {
        let id2 = id - 1;
        data.splice(id2, 1);
        let j = 1;
        for (let i = 0; i < data.length; i++) {
          data[i].id = j;
          j++;
        }

        localStorage.setItem("cartdetail", JSON.stringify(data));
        // document.getElementById("scount").innerHTML = id - 1;
        localStorage.setItem("cartcount", JSON.stringify(parseInt(id - 1)));

        addtocartdisplay();
      }
    }
  }
  addtocartdisplay();
}

// category product

function dispprodata(id) {
  let data = JSON.parse(localStorage.getItem("prodetail"));

  let a = [];

  let b = [];

  if (data != null) {
    for (let i = 0; i < data.productDetail.length; i++) {
      a.push(data.productDetail[i]);
    }
  }

  b = a.filter(cp);

  function cp(p) {
    return id == p.catid;
  }

  localStorage.setItem("cwdata", JSON.stringify(b));

  dcpd();
}

// display product

function dcpd() {
  let disp = JSON.parse(localStorage.getItem("cwdata"));

  let rrr = "";

  if (disp != null && disp.length > 0) {
    for (let i = 0; i < disp.length; i++) {
      rrr += `<div class="col-4">
      <a href="" onclick='addtocart(${disp[i].pid})'></a>
        <div>
          <img src="${disp[i].image}" alt="" style='height:350px; width:320px'><br><br>
          </div>
                          <h4 class="d-flex justify-content-center">${disp[i].name}</h4><br>
                          <div class="d-flex justify-content-around">
                              <span class="bg-success text-warning font-weight-bold p-3 rounded-circle">$ ${disp[i].price}</span><br><br>
                              <ul class="d-flex text-dark">
                                  <li ><button href="" id='addtocartnum' class="btn btn-sm bg-warning text-success font-weight-bold p-3" onclick='addtocart(${pddetail.productDetail[i].pid})'><i class="fas fa-shopping-cart text-primary mr-1"></i> Add To Cart</button></li>
                              </ul>
                          </div>
      
                      </div>`;
    }

    document.getElementById("products-img").innerHTML = rrr;
  }
}
