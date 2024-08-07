"use client";
import { WebMapBranchModel, WebMapLatLngBounds } from "../models";
import { LatLng } from "leaflet";
import { WebMapClusterModel } from "../models/WebMapClusterModel";

/** 
    @fileoverview: Provides the WebClusterController class responsible for clustering points on a map.
    @author Domingo Montesdeoca González
    ---------------------------------------------------
    @function clusterPoints() Groups points into clusters based on branches, zoom, and map center
    @function adjustClusterCenters() Adjust cluster centers based on map zoom
    @function isBranchVisible() Determines if a branch is within the visible limits of the map
    @function calculateVisibleBounds() Calculates visible map boundaries based on center and distance
    @function calculateDistance() Calculate the distance between two geographical points
    @function toRadians() Convert degrees to radians
    @function toDegrees() Convert radians to degrees
    @function zoomToClusterDistance() Defines the distance between clusters based on the zoom level
    @function zoomToVisibleBoundsDistance() Defines the distance of the visible boundaries based on the zoom level
*/

export default class WebClusterController {    
    /** [clusterPoints] This method takes in a list of BranchDto objects, the current zoom level of the map,
        and the center coordinates of the map. It then clusters the branches based on their proximity
        and returns a list of Cluster objects that represent these clusters. The clustering is done
        dynamically, and the clustering distance is determined based on the current zoom level of the map.
        The method first calculates the visible bounds of the map based on the center and zoom level.
        It then iterates through each branch, checking if it falls within the visible bounds of the map.
        If a branch is not visible, it is skipped. For each visible branch, the method tries to add it to
        an existing cluster. If a cluster is found within the clustering distance, the branch is added to
        that cluster. If no suitable cluster is found, a new cluster is created with the branch and added
        to the list of clusters. The method returns the list of clusters once all branches are processed.
        @param {WebMapBranchModel} branches
        @param {number} zoom
        @param {LatLng} center
        @returns {WebMapClusterModel[]}
    */
    public static clusterPoints(branches: WebMapBranchModel[], zoom: number, center: LatLng): WebMapClusterModel[] {
        const clusters: WebMapClusterModel[] = [];
        const clusterDistance: number = this.zoomToClusterDistance(zoom);
        const visibleBoundsDistance: number = this.zoomToVisibleBoundsDistance(zoom);

        const visibleBounds: WebMapLatLngBounds = this.calculateVisibleBounds(
            center,
            visibleBoundsDistance
        );

        for (const branch of branches) {
            const branchLatLng: LatLng = new LatLng(branch.latitude, branch.longitude);
      
            if (!this.isBranchVisible(branchLatLng, visibleBounds)) {
              continue;
            }            
      
            let addedToCluster: boolean = false;
            for (const cluster of clusters) {
              if (
                this.calculateDistance(cluster.center, branchLatLng) <=
                clusterDistance
              ) {
                cluster.branches.push(branch);
                addedToCluster = true;
                break;
              }
            }
      
            if (!addedToCluster) {
              clusters.push({ center: branchLatLng, branches: [branch] });
            }
          }

        this.adjustClusterCenters(clusters, zoom);
        return clusters;
    }

    public static sortBranchesFromCenterMapPoints(branches: WebMapBranchModel[], zoom: number, center: LatLng): WebMapBranchModel[] {
        const branchesNear:  WebMapBranchModel[] = [];
        const visibleBoundsDistance: number = this.zoomToVisibleBoundsDistance(zoom);

        const visibleBounds: WebMapLatLngBounds = this.calculateVisibleBounds(
            center,
            visibleBoundsDistance
        );

        for (const branch of branches) {
            const branchLatLng: LatLng = new LatLng(branch.latitude, branch.longitude);
      
            if (!this.isBranchVisible(branchLatLng, visibleBounds)) {
              continue;
            }            
      
            branchesNear.push(branch);
          }
        return branchesNear;
    }

    /** [adjustClusterCenters] This method controls if the zoom level is between 3 and 4 the point is manipulated 
        so that it appears in Spain and the Canary Islands.
        @param {WebMapClusterModel[]} clusters - List of clusters.
        @param {number} zoom - Current zoom level of the map.
    */
    public static adjustClusterCenters(clusters: WebMapClusterModel[], zoom: number) {
        if (clusters.length === 1 && zoom == 3 ) {
            clusters[0].center = new LatLng(41.644785, -5.912040);
        } else if (clusters.length === 2 && zoom == 4 ) {
            clusters[0].center = new LatLng(28.879392, -15.731875);
            clusters[1].center = new LatLng(37.628153, -4.891335);
        }
    }
    
    /** [_isBranchVisible] This private method takes in the latitude and longitude of a branch and the visible bounds
        of the map. It checks whether the branch falls within the visible bounds of the map.
        The method returns true if the branch is visible and false otherwise.
        @param {LatLng} branchLatLng - Latitude and longitude of the branch.
        @param {WebMapLatLngBounds} visibleBounds - Visible bounds of the map.
        @returns {boolean} - True if the branch is visible, false otherwise.
    */
    public static isBranchVisible(branchLatLng: LatLng, visibleBounds: WebMapLatLngBounds): boolean {        
        return visibleBounds.contains(branchLatLng);
    }


    /** [_calculateVisibleBounds] This private method calculates the visible bounds of the map based on the center coordinates
        and a given distance. The distance is used to determine the size of the visible bounds from the
        center. The method calculates the north, south, east, and west boundaries of the visible bounds
        and returns an instance of _LatLngBounds containing these boundaries.
        @param {LatLng[]} center - Camera center leaflet map.
        @param {number} distance - Distance from the branch.
        @returns {WebMapLatLngBounds} - Retorna una clase 
    */
    public static calculateVisibleBounds(center: LatLng, distance: number): WebMapLatLngBounds {
        const earthRadius = 6371000.0; // Earth radius in meters

        const latitude = center.lat;
        const longitude = center.lng;

        const latDistance = this.toDegrees(distance / earthRadius);
        const north = latitude + latDistance;
        const south = latitude - latDistance;

        const lonDistance = this.toDegrees(distance / (earthRadius * Math.cos(this.toRadians(latitude))));
        const east = longitude + lonDistance;
        const west = longitude - lonDistance;

        try {
            const southwest = new LatLng(south, west);
            const northeast = new LatLng(north, east);
            return new WebMapLatLngBounds(southwest, northeast);
        } catch (error) {
            return new WebMapLatLngBounds(
                new LatLng(0, 0),
                new LatLng(0, 0)
            );
        }
    }

    /** [_calculateDistance] This private method calculates the distance in meters between two points on the Earth's surface.
        It takes in the latitude and longitude of two points and uses the Haversine formula to calculate
        the distance. The method returns the distance between the two points in meters.
        @param {LatLng} point1
        @param {LatLng} point2
        @returns {number} number with the calculated distance.
    */
    public static calculateDistance(point1: LatLng, point2: LatLng): number {
        const lat1: number = point1.lat;
        const lon1: number = point1.lng;
        const lat2: number = point2.lat;
        const lon2: number = point2.lng;

        const earthRadius: number = 6371000.0; // Earth radius in meters

        const toRadians = (angle: number): number => {
            return (Math.PI * angle) / 180;
        };

        const dLat: number = toRadians(lat2 - lat1);
        const dLon: number = toRadians(lon2 - lon1);

        const a: number =
            Math.pow(Math.sin(dLat / 2), 2) +
            Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.pow(Math.sin(dLon / 2), 2);
        const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance: number = earthRadius * c;
        return distance;
    }

    /** [toRadians] This private method converts an angle from degrees to radians. 
        @param {number} degrees It takes in an angle in degrees
        @returns {number} the equivalent angle in radians.
    */
    public static toRadians(degrees: number): number {
        return (degrees * Math.PI) / 180;
    }

    /** [toDegrees] This private method converts an angle from radians to degrees. 
        @param {number} radians It takes in an angle in radians
        @returns {number} the equivalent angle in degrees.
    */
    public static toDegrees(radians: number): number {
        return (radians * 180) / Math.PI;
    }

    /** [_zoomToClusterDistance] This private map contains zoom levels as keys and their corresponding cluster distances as values.
        It is used to determine the clustering distance based on the current zoom level of the map.
        The clustering distance is defined in meters and varies with different zoom levels.
        @param {number} zoom zoom applied on leaflet map.
        @returns {number} the distance in meters based on the zoom.
    */
    public static zoomToClusterDistance(zoom: number): number {
        console.log(zoom);
        const zoomToClusterDistances: Record<number, number> = {
            3.0: 900000000,
            4.0: 1000000,
            5.0: 600000,
            6.0: 200000,
            7.0: 130000,
            8.0: 90000,
            9.0: 20000,
            10.0: 8500,
            11.0: 4500,
            12.0: 2500,
            13.0: 1500,
            14.0: 750,
            15.0: 350,
            16.0: 150,
            17.0: 40,
            18.0: 0.01
        };

        return zoomToClusterDistances[Math.floor(zoom)] ?? 900000000;
    }

    /** [zoomToVisibleBoundsDistance] This private map contains zoom levels as keys and their corresponding visible bounds distances as values.
        It is used to determine the visible bounds distance based on the current zoom level of the map.
        The visible bounds distance is defined in meters and represents the size of the visible area on the map
        at different zoom levels.
        @param {number} zoom,
        @returns {number} the distance in meters based on the zoom.
    */
    public static zoomToVisibleBoundsDistance(zoom: number): number {
        console.log(zoom);
        const zoomToVisibleBoundsDistances: Record<number, number> = {
            3.0: 90000000000,
            4.0: 5000000,
            5.0: 3000000,
            6.0: 1500000,
            7.0: 750000,
            8.0: 400000,
            9.0: 200000,
            10.0: 100000,
            11.0: 50000,
            12.0: 25000,
            13.0: 15000,
            14.0: 10000,
            15.0: 8000,
            16.0: 8000,
            17.0: 8000,
            18.0: 8000
        };

        return zoomToVisibleBoundsDistances[Math.floor(zoom)] ?? 250;
    }
    /** [calculateAverage] This private method returns a representation of a pair of latitude and longitude coordinates.
     * These values will be the average of a list of branches.
        @param {branches} Group of branches associated with a company,
        @returns {LatLng} The average coordinates 
    */

    public static calculateAverage( branches: WebMapBranchModel[] ) : LatLng {
        const totalLatitude = branches.map((branch:any) => branch.latitude).reduce((value:number, element:number) => value + element);
        const totalLongitude = branches.map((branch:any) => branch.longitude).reduce((value:number, element:number) => value + element);
        const averageLatitude = totalLatitude / branches.length;
        const averageLongitude = totalLongitude / branches.length;

        return new LatLng(averageLatitude, averageLongitude);
    }
    /** [calculateZoomLevel] This private map contains distances in meters as keys and their corresponding visible bounds distances as zoom values.
        It is used to determine the visible bounds distance based on the current zoom level of the map.
        To get this distance, it is necessary to calculate the distance in meters between a certain branch,
        and the average location. After that the threshold distance is selected depending of how close they are of the
        current threshold, and the zoom level is returned.
        @param {latLngAverage} Average latitude and longitude,
        @param {branch} A selected branch to determine the distance,
        @returns {number} Zoom applied to the average distance.
    */
    public static calculateZoomLevel( latLngAverage: LatLng, branch: WebMapBranchModel ) {
        const branchLatLng = new LatLng(branch.latitude, branch.longitude);
        const distance = WebClusterController.calculateDistance(latLngAverage, branchLatLng);
        
        const thresHoldDistanceSelected: { [key: number]: number } = {
            50: 15,
            100: 14,
            200: 14,
            500: 13,
            1000: 12,
            2000: 11,
            4000: 10,
            8000: 9,
            16000: 9,
            32000: 9,
            64000: 8,
            128000: 7,
            256000: 4,
          };
          
        let nearestThreshold: number = Object.keys(thresHoldDistanceSelected).map(Number)[0];
        
        for (const thresholdStr in thresHoldDistanceSelected) {
            const threshold = parseInt(thresholdStr);
            if (Math.abs(distance - threshold) < Math.abs(distance - nearestThreshold)) {
                nearestThreshold = threshold;
            }
        }
        return thresHoldDistanceSelected[nearestThreshold];
    }
}