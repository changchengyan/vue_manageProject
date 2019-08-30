//@private
function transformLat(x, y) {
    let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
    return ret;
}

//@private
function transformLon(x, y) {
    x = parseFloat(x);
    y = parseFloat(y);
    let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0;
    return ret;
}

let pi = Math.PI;

let ee = 0.00669342162296594323, a = 6378245.0;


/**
 * @private
 * */
function transform(lat, lon) {
    lat = parseFloat(lat);
    lon = parseFloat(lon);
    let dLat = transformLat(lon - 105.0, lat - 35.0);
    let dLon = transformLon(lon - 105.0, lat - 35.0);
    let radLat = lat / 180.0 * pi;
    let magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    let sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
    dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
    let mgLat = lat + dLat;
    let mgLon = lon + dLon;
    return [mgLat, mgLon];
}


/**
 * @description 高德坐标系 (GCJ-02) to wgs84
 *
 * @param {Number} lon 经度
 * @param {Number} lat 纬度
 *
 * @public
 *
 * @return {Array} [经度,纬度]
 * */
export function gcj02ToWgs84(lon, lat) {
    let wgs84Points = transform(lat, lon);
    let longitude = lon * 2 - wgs84Points[1];
    let latitude = lat * 2 - wgs84Points[0];
    return [longitude, latitude];
}


/**
 * @description wgs84 to 高德坐标系 (GCJ-02)
 *
 * @param {Number} lon 经度
 * @param {Number} lat 纬度
 *
 * @public
 *
 * @return {Array} [经度,纬度]
 * */
export function wgs84ToGcj02(lon, lat) {
    lat = parseFloat(lat);

    lon = parseFloat(lon);

    let dLat = transformLat(lon - 105.0, lat - 35.0);

    let dLon = transformLon(lon - 105.0, lat - 35.0);

    let radLat = lat / 180.0 * Math.PI;

    let magic = Math.sin(radLat);

    magic = 1 - ee * magic * magic;

    let sqrtMagic = Math.sqrt(magic);

    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);

    dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);

    let mgLat = lat + dLat;

    let mgLon = lon + dLon;
    return [mgLon, mgLat];
}