using Microsoft.AspNetCore.Authorization;

namespace ApiOktaDemo.Api
{
    public class HasScopedRequirement(string scope, string issuer) : IAuthorizationRequirement
    {
        public string Issuer { get; set; } = issuer ?? throw new ArgumentNullException(nameof(issuer));
        public string Scope { get; set; } = scope ?? throw new ArgumentNullException(nameof(scope));
    }
}
