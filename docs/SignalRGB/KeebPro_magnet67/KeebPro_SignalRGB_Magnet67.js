export function Name() { return "KeebPro Magnet-67"; }
export function VendorId() { return 0x5945; }
export function ProductId() { return 0x4867; }
export function Publisher() { return "KeebPro"; }
export function Documentation() { return "keebpro/magnet67"; }
export function Size() { return [15, 5]; }
export function Type() { return "Hid"; }
export function DefaultPosition() { return [10, 100]; }
export function DefaultScale() { return 8.0; }
/* global
shutdownMode:readonly
shutdownColor:readonly
LightingMode:readonly
forcedColor:readonly
*/
export function ControllableParameters() {
	return [
		{ "property": "shutdownMode", "group": "lighting", "label": "Shutdown Mode", "type": "combobox", "values": ["SignalRGB", "Hardware"], "default": "SignalRGB" },
		{ "property": "shutdownColor", "group": "lighting", "label": "Shutdown Color", "min": "0", "max": "360", "type": "color", "default": "#009bde" },
		{ "property": "LightingMode", "group": "lighting", "label": "Lighting Mode", "type": "combobox", "values": ["Canvas", "Forced"], "default": "Canvas" },
		{ "property": "forcedColor", "group": "lighting", "label": "Forced Color", "min": "0", "max": "360", "type": "color", "default": "#009bde" },
	];
}

//Plugin Version: Built for Protocol V1.0.3

const vKeys =
	[
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
		15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
		30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
		44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
		58, 59, 60, 61, 62, 63, 64, 65, 66
	];
const vKeyNames =
	[
		"Esc", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "+", "Backspace", "Home", //15
		"Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\", "Page Up",     //15
		"CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter", "Page Down",    //14
		"Left Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Right Shift", "Up Arrow", "End",   //14
		"Left Ctrl", "Left Win", "Left Alt", "Space", "Right Alt", "Fn", "Left Arrow", "Down Arrow", "Right Arrow", //9

	];

const vKeyPositions =
	[
		[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0], //15
		[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1], [14, 1], //15
		[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [13, 2], [14, 2], //14
		[0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [13, 3], [14, 3],  //14
		[0, 4], [1, 4], [2, 4], [6, 4], [10, 4], [11, 4], [12, 4], [13, 4], [14, 4]  //9
	];

let LEDCount = 0;

export function LedNames() {
	return vKeyNames;
}

export function LedPositions() {
	return vKeyPositions;
}

export function Initialize() {
	setDeviceEndpoint();

	ClearReadBuffer();
	checkFirmwareType();

	ClearReadBuffer();
	versionQMK();

	ClearReadBuffer();
	versionSignalRGBProtocol();
	// uniqueIdentifier();
	ClearReadBuffer();
	totalLEDs();

	ClearReadBuffer();
	effectEnable();
}

export function Render() {
	for (let i = 0; i < 67; i += 8) {
		sendColors(i);
	}
}

export function Shutdown(SystemSuspending) {

	if (SystemSuspending) {
		sendColors("#000000"); // Go Dark on System Sleep/Shutdown
	} else {
		if (shutdownMode === "SignalRGB") {
			sendColors(shutdownColor);
		} else {
			effectDisable();
		}
	}

}

function setDeviceEndpoint() {
	device.set_endpoint(1, 0x0061, 0xff60);
}

function ClearReadBuffer(timeout = 10) {
	let count = 0;
	const readCounts = [];
	device.flush();

	while (device.getLastReadSize() > 0) {
		device.read([0x00], 32, timeout);
		count++;
		readCounts.push(device.getLastReadSize());
	}
	//device.log(`Read Count ${count}: ${readCounts} Bytes`)
}

function checkFirmwareType() {
	ClearReadBuffer();
	const packet = [];
	// packet[0] = 0x00;
	// packet[1] = 0x28;
	packet[0] = 0x00; // fixed
	packet[1] = 0x08; // id_custom_get_value,
	packet[2] = 0xfe; // id_keebpro_signal_channel
	packet[3] = 0x28; // 	GET_FIRMWARE_TYPE = 0x28,

	setDeviceEndpoint();

	device.write(packet, 32);

	const returnpacket = device.read(packet, 32);
	const FirmwareTypeByte = returnpacket[5];

	if (FirmwareTypeByte !== 1 || FirmwareTypeByte !== 2) {
		device.notify("Unsupported Firmware: ", "Click Show Console, and then click on troubleshooting for your keyboard to find out more.", 1, "Documentation");
	}
	device.log("Firmware Type: " + FirmwareTypeByte);
	device.pause(30);
}

function versionQMK() //Check the version of QMK Firmware that the keyboard is running
{
	ClearReadBuffer();
	let packet = [];
	packet[0] = 0x00; // fixed
	packet[1] = 0x08; // id_custom_get_value,
	packet[2] = 0xfe; // id_keebpro_signal_channel
	packet[3] = 0x21; //GET_QMK_VERSION = 0x21,

	setDeviceEndpoint();

	device.write(packet, 32);

	const returnpacket = device.read(packet, 33);
	const QMKVersionByte1 = returnpacket[5];
	const QMKVersionByte2 = returnpacket[6];
	const QMKVersionByte3 = returnpacket[7];
	device.log("QMK Version: " + QMKVersionByte1 + "." + QMKVersionByte2 + "." + QMKVersionByte3);
	device.pause(30);
}

function versionSignalRGBProtocol() //Grab the version of the SignalRGB Protocol the keyboard is running
{
	ClearReadBuffer();
	let packet = [];
	packet[0] = 0x00; // fixed
	packet[1] = 0x08; // id_custom_get_value,
	packet[2] = 0xfe; // id_keebpro_signal_channel
	packet[3] = 0x22; //GET_PROTOCOL_VERSION = 0x22

	setDeviceEndpoint();

	device.write(packet, 32);
	const returnpacket = device.read(packet, 33);

	const ProtocolVersionByte1 = returnpacket[5];
	const ProtocolVersionByte2 = returnpacket[6];
	const ProtocolVersionByte3 = returnpacket[7];
	device.log("SignalRGB Protocol Version: " + ProtocolVersionByte1 + "." + ProtocolVersionByte2 + "." + ProtocolVersionByte3);
	device.pause(30);
}

function uniqueIdentifier() //Grab the unique identifier for this keyboard model
{
	let packet = [];

	packet[0] = 0x00; // fixed
	packet[1] = 0x08; // id_custom_get_value,
	packet[2] = 0xfe; // id_keebpro_signal_channel
	packet[3] = 0x23; // GET_UNIQUE_IDENTIFIER = 0x23

	setDeviceEndpoint();

	device.write(packet, 32);
	packet = device.read(packet, 32);

	const UniqueIdentifierByte1 = packet[4];
	const UniqueIdentifierByte2 = packet[5];
	const UniqueIdentifierByte3 = packet[6];
	device.log("Unique Device Identifier: " + UniqueIdentifierByte1 + UniqueIdentifierByte2 + UniqueIdentifierByte3);
	device.pause(30);
}

function effectEnable() //Enable the SignalRGB Effect Mode
{
	let packet = [];

	packet[0] = 0x00; // fixed
	packet[1] = 0x07; // id_custom_set_value,
	packet[2] = 0xfe; // id_keebpro_signal_channel
	packet[3] = 0x25; // SET_SIGNALRGB_MODE_ENABLE = 0x25,

	setDeviceEndpoint();

	device.write(packet, 32);
	device.log("开灯");
	device.pause(30);
}

function effectDisable() //Revert to Hardware Mode
{
	packet[0] = 0x00; // fixed
	packet[1] = 0x07; // id_custom_set_value,
	packet[2] = 0xfe; // id_keebpro_signal_channel
	packet[3] = 0x26; // SET_SIGNALRGB_MODE_DISABLE = 0x26,

	setDeviceEndpoint();

	device.write(packet, 32);
	device.log("关灯");
}


function sendColors(offset, overrideColor) {
	const packet = [];
	packet[0] = 0x00; // fixed
	packet[1] = 0x07; // id_custom_set_value,
	packet[2] = 0xfe; // id_keebpro_signal_channel
	packet[3] = 0x24; // STREAM_RGB_DATA = 0x24,
	packet[4] = offset;

	for (let iIdx = 0; iIdx < 8; iIdx++) {
		const iLedCoord = offset + iIdx;
		const iPxX = iLedCoord % 15;
		const iPxY = iLedCoord / 15;
		let color;

		if (overrideColor) {
			color = hexToRgb(overrideColor);
		} else if (LightingMode === "Forced") {
			color = hexToRgb(forcedColor);
		} else {
			color = device.color(iPxX, iPxY);
		}
		// let hsv = rgb2hsv(color[0], color[1], color[2]);
		// device.log(hsv.v);
		// let color2;
		// if (hsv.v > 64) {
		// 	color2 = hsv2rgb(hsv.h, hsv.s, hsv.v);
		// } else {
		// 	color2 = hsv2rgb(hsv.h, hsv.s, 64);
		// }

		// device.log("1R" + color[0] + "G" + color[1] + "B" + color[2]);
		// device.log("2R" + color2[0] + "G" + color2[1] + "B" + color2[2]);

		const iLedIdx = (iIdx * 3) + 5;
		packet[iLedIdx] = color[0];
		packet[iLedIdx + 1] = color[1];
		packet[iLedIdx + 2] = color[2];
	}
	// setDeviceEndpoint();
	device.write(packet, 32);
	// device.log("sendColors:" + packet);
}

function hexToRgb(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	const colors = [];
	colors[0] = parseInt(result[1], 16);
	colors[1] = parseInt(result[2], 16);
	colors[2] = parseInt(result[3], 16);

	return colors;
}
// function rgb2hsv(r, g, b) {
// 	let rabs = r / 255;
// 	let gabs = g / 255;
// 	let babs = b / 255;
// 	let v = Math.max(rabs, gabs, babs);
// 	let diff = v - Math.min(rabs, gabs, babs);
// 	let diffc = c => (v - c) / 6 / diff + 1 / 2;
// 	let percentRoundFn = num => Math.round(num * 100) / 100;

// 	let h, s;

// 	if (diff == 0) {
// 		h = s = 0;
// 	} else {
// 		s = diff / v;
// 		let rr = diffc(rabs);
// 		let gg = diffc(gabs);
// 		let bb = diffc(babs);

// 		if (rabs === v) {
// 			h = bb - gg;
// 		} else if (gabs === v) {
// 			h = (1 / 3) + rr - bb;
// 		} else if (babs === v) {
// 			h = (2 / 3) + gg - rr;
// 		}

// 		if (h < 0) {
// 			h += 1;
// 		} else if (h > 1) {
// 			h -= 1;
// 		}
// 	}

// 	return {
// 		h: Math.round(h * 360),
// 		s: percentRoundFn(s * 100),
// 		v: percentRoundFn(v * 100)
// 	};
// }

// var TAU = Math.PI * 2;
// var round = Math.round;
// var min = Math.min;
// var max = Math.max;
// var ceil = Math.ceil;
// function set(r, g, b, out) {
// 	out[0] = round(r * 255);
// 	out[1] = round(g * 255);
// 	out[2] = round(b * 255);
// }

// function clamp(v, l, u) {
// 	return max(l, min(v, u));
// }

// function hsv2rgb(h, s, v, out) {
// 	out = out || [0, 0, 0];
// 	h = h % 360;
// 	s = clamp(s, 0, 1);
// 	v = clamp(v, 0, 1);

// 	// Grey
// 	if (!s) {
// 		out[0] = out[1] = out[2] = ceil(v * 255);
// 	} else {
// 		var b = ((1 - s) * v);
// 		var vb = v - b;
// 		var hm = h % 60;
// 		switch ((h / 60) | 0) {
// 			case 0: set(v, vb * h / 60 + b, b, out); break;
// 			case 1: set(vb * (60 - hm) / 60 + b, v, b, out); break;
// 			case 2: set(b, v, vb * hm / 60 + b, out); break;
// 			case 3: set(b, vb * (60 - hm) / 60 + b, v, out); break;
// 			case 4: set(vb * hm / 60 + b, b, v, out); break;
// 			case 5: set(v, b, vb * (60 - hm) / 60 + b, out); break;
// 		}
// 	}
// 	return out;
// }

function totalLEDs() //Calculate total number of LEDs
{

	const packet = [];

	packet[0] = 0x00; // fixed
	packet[1] = 0x08; // id_custom_get_value,
	packet[2] = 0xfe; // id_keebpro_signal_channel
	packet[3] = 0x27; // GET_TOTAL_LEDS = 0x27

	setDeviceEndpoint();



	device.write(packet, 32);
	const returnpacket = device.read(packet, 33);
	LEDCount = returnpacket[5];
	device.log("Device Total LED Count: " + LEDCount);
}

export function Validate(endpoint) {
	return endpoint.interface === 1;
}

export function ImageUrl() {
	return "https://marketplace.signalrgb.com/devices/default/keyboard-60.png";
}