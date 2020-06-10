namespace CarStartup.Controllers
{
    public enum ApiResult
    {
        Unknown = 0,
        Ok = 200,
        ClientError = 400,
        ServerError = 500,
    }
    public class ApiResponse
    {
        public ApiResponse() => result = ApiResult.Ok;
        public ApiResponse(ApiResult r) => result = r;
        public ApiResult result;
    }
    public class ApiError : ApiResponse
    {
        public ApiError() : base(ApiResult.ServerError) {}
        public ApiError(string e) : base(ApiResult.ClientError)
        {
            error = e;
        }
        public string error;
    }
}
