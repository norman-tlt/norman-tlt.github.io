// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
//https://norman-tlt.github.io/

export const environment = {
  production: true,
  githubConfig: {
    organization: "Telit",
    server: "https://api.github.com",
    sampleAppRepository: "IoT-AppZone-SampleApps",
    api: {
      getRepositories: "orgs/Telit/repos" //"/orgs/{org}/repos"
    },
    metadata: "metadata.json",
  },
  categories: [
    {id: 1, name: "All", dir: "*"},
    // {id: 2, name: "AUX_UART", dir: "AppZoneSampleApps-AUX_UART"},
    // {id: 3, name: "BASIC", dir: "AppZoneSampleApps-BASIC"},
    // {id: 4, name: "C++", dir: "AppZoneSampleApps-C++"},
    // {id: 5, name: "MAIN_UART", dir: "AppZoneSampleApps-MAIN_UART"},
    // {id: 6, name: "GPIO_Toggle", dir: "AppZoneSampleApps-MISC/GPIO_Toggle"},
    // {id: 7, name: "USB0", dir: "AppZoneSampleApps-USB0"},
  ],
  platforms: [
    {id: 1, name: "All", dir: "*"},
    {id: 2, name: "LE910Cx_L", dir: "LE910Cx_L"},
    {id: 3, name: "LE910Cx_X", dir: "LE910Cx_X"},
    {id: 4, name: "ME310G1", dir: "ME310G1-ME910G1-ML865G1"},
    {id: 5, name: "ME910G1", dir: "ME310G1-ME910G1-ML865G1"},
    {id: 6, name: "ML865G1", dir: "ME310G1-ME910G1-ML865G1"},
    {id: 7, name: "ME910C1", dir: "ME910C1-ML865C1-NE910C1"},
    {id: 8, name: "ML865C1", dir: "ME910C1-ML865C1-NE910C1"},
    {id: 9, name: "NE910C1", dir: "ME910C1-ML865C1-NE910C1"}
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
