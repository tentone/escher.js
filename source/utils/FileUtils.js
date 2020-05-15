/**
 * File utils is used to read and write files.
 *
 * Can be used alongside with object serialization to store and load objects from file.
 *
 * @class
 * @static
 */
function FileUtils(){}

/**
 * Read a local or remote file as text data.
 *
 * @param {string} fname Path or URL of the file being read.
 * @param {Function} onLoad onLoad callback receives the read data as parameter.
 * @param {Function} onError onError call is called when a error occurs while reading the file.
 */
FileUtils.read = function(fname, onLoad, onError)
{
	var file = new XMLHttpRequest();
	file.overrideMimeType("text/plain");
	file.open("GET", fname, true);
	if(onLoad !== undefined)
	{
		file.onload = function()
		{
			onLoad(file.response);
		};
	}

	if(onError !== undefined)
	{
		file.onerror = onError;
	}

	file.send(null);
};

/**
 * Write text to a file and automatically download it from blob storage.
 *
 * @method writeFile
 * @param {string} fname Path of the file to write.
 * @param {string} data Text data to be written to the file.
 */
FileUtils.write = function(fname, data)
{
	var blob = new Blob([data], {type:"octet/stream"});
	var download = document.createElement("a");
	download.download = fname;
	download.href = window.URL.createObjectURL(blob);
	download.style.display = "none";
	download.onclick = function()
	{
		document.body.removeChild(this);
	};
	document.body.appendChild(download);
	download.click();
};

export {FileUtils};
