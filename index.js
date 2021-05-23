import { useEffect } from 'react';

const isRouteSecured = (securedPathsPatterns, openPathsPatterns, path) => {
  if (!securedPathsPatterns.some(regex => regex.test(path))) return false;
  if (openPathsPatterns.some(regex => regex.test(path))) return false;
  return true;
}

/**
 * A React component for securing application routes
 *
 * @param children Children to render
 * @param path Current path
 * @param securedPathsPatterns A list of regex patterns covering paths which require authorization
 * @param openPathsPatterns A list of regex patterns covering paths which don't require authorization
 * @param onUnauthorized A function that will be triggered if unauthorized
 * @param unauthorizedComponent A component that will be rendered when unauthorized
 * @param isAuthorized A boolean specifying if is authorized
 * @param isLoading A boolean specifying if authorization process is still in progress
 * @param loaderComponent A component which will be rendered when unauthorized but authorization is still in progress
 */
const A12 = ({
  children,
  path,
  securedPathsPatterns,
  openPathsPatterns,
  onUnauthorized,
  unauthorizedComponent,
  isAuthorized,
  isLoading,
  loaderComponent,
}) => {
  useEffect(() => {
    if (isRouteSecured(securedPathsPatterns, openPathsPatterns, path) && !isAuthorized && !isLoading) {
      onUnauthorized();
    }
  }, [isAuthorized, isLoading, onUnauthorized]);

  if (!isRouteSecured(securedPathsPatterns, openPathsPatterns, path)) return children;

  if (isAuthorized) return children;

  if (isLoading) return loaderComponent || null;

  return unauthorizedComponent || null;
};

export default A12;
