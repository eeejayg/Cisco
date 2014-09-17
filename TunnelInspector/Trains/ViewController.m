//
//  ViewController.m
//  Trains
//
//  Created by Robert Eickmann on 5/10/14.
//  Copyright (c) 2014 devnull. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController
@synthesize webView;

NSString *currentURL;





- (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error {
    NSLog(@"%@", error);
}


-(void)viewDidAppear:(BOOL)animated {
    webView.delegate = self;
    
    

    NSString* filePath = [[NSBundle mainBundle] pathForResource:@"index"
                                                         ofType:@"html"
                                                    inDirectory:@"website"];
    
    NSURL* fileURL = [NSURL fileURLWithPath:filePath];
    NSURLRequest* request = [NSURLRequest requestWithURL:fileURL];
    [webView loadRequest:request];
    
    
    
}

- (BOOL)prefersStatusBarHidden {
    return YES;
}


- (void)viewDidLoad
{
    [super viewDidLoad];
 
    [[UIApplication sharedApplication] setStatusBarHidden:YES
                                            withAnimation:UIStatusBarAnimationFade];
    
    webView = [[UIWebView alloc] initWithFrame:CGRectMake(0, 0, self.view.bounds.size.height, self.view.bounds.size.width)];
    webView.scrollView.scrollEnabled = NO;
    webView.scrollView.bounces = NO;
    
    [self.view addSubview:webView];


    
	// Do any additional setup after loading the view, typically from a nib.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
