export interface SocialMedia {
    url: string,
    loginUrl: string,
    hashtagSearchPageUrl: string,
    emailSelector: string,
    passwordSelector: string,
    loginButtonSelector: string,
    acceptButtonSelector: string,
    hasLoggedInSelector: string,
    hashtagToSearch: string,
    actionDelay: number,
    getHashtagCount: () => {}
}