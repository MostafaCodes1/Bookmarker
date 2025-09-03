var bookmarkNameInput = document.getElementById('bookmarkName');
var bookmarkUrlInput = document.getElementById('bookmarkUrl');

var bookmarkList = [];
console.log();
if (localStorage.getItem('bookmarkContainer') !== null) {
  bookmarkList = JSON.parse(localStorage.getItem('bookmarkContainer'));
  displayBookmark();
}
function addBookmark() {
  var bookmark = {
    name: bookmarkNameInput.value.trim(),
    url: bookmarkUrlInput.value.trim().toLowerCase(),
  };
  var nameRegex = /^.{3,}$/;
  var urlRegex = /^www\..+\.com$/;
  if (!nameRegex.test(bookmark.name) || !urlRegex.test(bookmark.url)) {
    Swal.fire({
      icon: 'error',
      title: 'Not Acceptable Bookmark',
      text: `A bookmark's name must have at least 3 characters, and the URL must start with 'www.' and end with '.com'.`,
      confirmButtonText: 'Got it!',
      timer: 5000,
      timerProgressBar: true,
    });
    return;
  }
  var isDuplicated = false;
  for (var i = 0; i < bookmarkList.length; i++) {
    if (bookmarkList[i].url === bookmark.url) {
      isDuplicated = true;
      Swal.fire({
        icon: 'error',
        title: 'Duplicate Bookmark Detected',
        text: 'A bookmark with the same URL already exists. Please choose a different URL.',
        confirmButtonText: 'Got it!',
        timer: 5000,
        timerProgressBar: true,
      });
      break;
    }
  }

  if (isDuplicated === false) {
    bookmarkList.push(bookmark);
    displayBookmark();
    clearBookmarkForm();
    localStorage.setItem('bookmarkContainer', JSON.stringify(bookmarkList));
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your Bookmark has been saved',
      showConfirmButton: false,
      timer: 1500,
    });
    console.log(bookmark.name);
    console.log(bookmark.url);
  }
}

function displayBookmark() {
  bookmarkElement = '';
  for (var i = 0; i < bookmarkList.length; i++) {
    console.log(bookmarkList[i].url);
    bookmarkElement += `
              <tr class="text-center">
                <th class="pt-3" scope="row">${i}</th>
                <td class="pt-3">${bookmarkList[i].name}</td>
                <td>
                <a href="https://${bookmarkList[i].url}" target="_blank"><button type="button" class="btn visit">
                    <span><i class="fa-solid fa-eye"></i></span>Visit
                  </button></a>
                </td>
                <td>
                  <button onclick="deleteBookmark(${i})" type="button" class="btn delete">
                    <span><i class="fa-solid fa-trash"></i></span>Delete
                  </button>
                </td>
              </tr>
    `;
  }
  document.getElementById('tableData').innerHTML = bookmarkElement;
  console.log();
}

function clearBookmarkForm() {
  bookmarkNameInput.value = null;
  bookmarkUrlInput.value = null;
}
function deleteBookmark(index) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      bookmarkList.splice(index, 1);
      localStorage.setItem('bookmarkContainer', JSON.stringify(bookmarkList));
      displayBookmark();
      Swal.fire({
        title: 'Deleted!',
        text: 'Your bookmark has been deleted.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    }
  });
}