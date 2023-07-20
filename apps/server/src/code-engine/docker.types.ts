interface Network {
  IPAMConfig: null | unknown
  Links: null | unknown
  Aliases: null | unknown
  NetworkID: string
  EndpointID: string
  Gateway: string
  IPAddress: string
  IPPrefixLen: number
  IPv6Gateway: string
  GlobalIPv6Address: string
  GlobalIPv6PrefixLen: number
  MacAddress: string
  DriverOpts: null | unknown
}

interface NetworkSettings {
  Networks: {
    bridge: Network
  }
}

interface HostConfig {
  NetworkMode: string
}

export interface DockerContainer {
  Id: string
  Names: string[]
  Image: string
  ImageID: string
  Command: string
  Created: number
  Ports: unknown[]
  Labels: Record<string, unknown>
  State: string
  Status: string
  HostConfig: HostConfig
  NetworkSettings: NetworkSettings
  Mounts: unknown[]
}

/*
const data: DockerContainer = {
  'Id': 'b051cd8df3d969b9d024c92e9c9788ba644503e333fe17019eb651c2d8686910',
  'Names': [
    '/zealous_wozniak'
  ],
  'Image': 'node-client',
  'ImageID': 'sha256:735004e918be22440be97eb51af318db096d820e24fdcd6b38ebb3b8e15f7fb4',
  'Command': 'docker-entrypoint.sh npm run prod',
  'Created': 1685492343,
  'Ports': [],
  'Labels': {},
  'State': 'exited',
  'Status': 'Exited (1) 6 days ago',
  'HostConfig': {
    'NetworkMode': 'default'
  },
  'NetworkSettings': {
    'Networks': {
      'bridge': {
        'IPAMConfig': null,
        'Links': null,
        'Aliases': null,
        'NetworkID': '6bdfa963943e3c22ad9d75f7177f0b97731a348003b129bf8f714a6df7fd9e8e',
        'EndpointID': '',
        'Gateway': '',
        'IPAddress': '',
        'IPPrefixLen': 0,
        'IPv6Gateway': '',
        'GlobalIPv6Address': '',
        'GlobalIPv6PrefixLen': 0,
        'MacAddress': '',
        'DriverOpts': null
      }
    }
  },
  'Mounts': []
}
*/
