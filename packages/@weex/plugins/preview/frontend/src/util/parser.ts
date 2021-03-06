/* Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
export interface IParser {
  unique (array: any[])
}

export class Parser implements IParser {
  unique (array: any[]) {
    let unique = {}
    array.forEach(function (item) {
      unique[JSON.stringify(item)] = item
    })
    array = Object.keys(unique).map(function (u) {
      return JSON.parse(u)
    })
    return array
  }

  mergeApmData (data: any) {
    let result = {}
    for (let key in data) {
      result[key] = {}
      result[key]['stage'] = {}
      data[key]['stage'] &&
        data[key]['stage'].forEach(stage => {
          for (let stagekey in stage) {
            result[key]['stage'][stagekey] = stage[stagekey]
          }
        })
      result[key]['properties'] = {}
      data[key]['properties'] &&
        data[key]['properties'].forEach(properties => {
          for (let propertieskey in properties) {
            result[key]['properties'][propertieskey] = properties[propertieskey]
          }
        })
      result[key]['stats'] = {}
      data[key]['stats'] &&
        data[key]['stats'].forEach(statss => {
          for (let statsskey in statss) {
            result[key]['stats'][statsskey] = statss[statsskey]
          }
        })
      result[key]['event'] = {}
      data[key]['event'] &&
        data[key]['event'].forEach(events => {
          for (let eventskey in events) {
            result[key]['event'][eventskey] = events[eventskey]
          }
        })
      result[key]['wxinteraction'] = data[key]['wxinteraction']
    }
    return result
  }

  // calcProcessPercent (raw: any, data?: any) {
  //   let result = {}
  //   for (let instance in raw) {
  //     result[instance] = Object.keys(raw[instance].properties).length / data.properties.length
  //     result[instance] += Object.keys(raw[instance].stage).length / data.stage.length
  //     result[instance] += Object.keys(raw[instance].stats).length / data.stats.length
  //     result[instance] /= 3
  //     result[instance] = Math.ceil(result[instance] * 100)
  //   }
  //   console.log(result)
  //   return result
  // }
}
