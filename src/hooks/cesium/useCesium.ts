import * as cesium from "cesium";
cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1YmNhM2QxZS0zOGNlLTQ0M2QtYWE4My01ZWJkZTRiNzQ4MTciLCJpZCI6NTQ1MTksImlhdCI6MTYxOTk1Mzc1M30.p0NAeTrdxi_14ckRpe3izv3DQw1AGa8rgweEITjLxbQ'

export default function () {
  return { ...cesium }
}
