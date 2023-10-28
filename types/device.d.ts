interface Device {
  id: number
  regionId: number
  name: string
  lng?: number
  lat?: number
  alt?: number
  [prosName: string]: any
}

interface DevicePageParams extends PageParams {
  regionId?: number
}
