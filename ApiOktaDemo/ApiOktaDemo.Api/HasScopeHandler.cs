using Microsoft.AspNetCore.Authorization;

namespace ApiOktaDemo.Api
{
    public class HasScopeHandler : AuthorizationHandler<HasScopedRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, HasScopedRequirement requirement)
        {

            var scopes = context.User.FindAll(c => c.Type == "permissions" && c.Issuer == requirement.Issuer);
            if (scopes.Any() == false)
            {
                return Task.CompletedTask;
            }

            // Check each "permissions" claim for the required scope
            foreach (var scope in scopes)
            {
                var permissions = scope.Value.Split(' '); // Assuming permissions are space-separated
                if (permissions.Contains(requirement.Scope))
                {
                    context.Succeed(requirement);
                    break;
                }
            }
            return Task.CompletedTask;
        }
    }
}
