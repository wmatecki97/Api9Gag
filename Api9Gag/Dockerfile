#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM aspnetchromium2 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Api9Gag/Api9Gag.csproj", "Api9Gag/"]
RUN dotnet restore "Api9Gag/Api9Gag.csproj"
COPY . .
WORKDIR "/src/Api9Gag"
RUN dotnet build "Api9Gag.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Api9Gag.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Api9Gag.dll"]