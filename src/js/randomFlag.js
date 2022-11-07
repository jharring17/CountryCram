// Get all the images.
// Make these the names of the flags (including the .jpg)
// TODO: Add flags to array.
image_array = [
    'flag1',
    'flag2',
    'flag3',
    'flag4'
]

function get_random_flag() {
    // Get a random index.
    random_index = Math.floor(Math.random() * image_array.length())

    // Get an image at the random_index
    selected_image = image_array[random_index]

    // TODO: Add the image source to getElementById function.
    // Display the image with selected image source.
    document.getElementById('').src = './images/flags/${selected_image}'
}